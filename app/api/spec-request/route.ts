import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { getCategory } from "@/data/catalog";
import { rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const QUANTITIES = new Set(["1", "2–5", "6–20", "20+"]);
const TITLE_PREFS = new Set(["Clean", "Rebuildable", "Either"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SpecRequestBody {
  company?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  country?: string;
  destination_port?: string;
  category?: string;
  spec?: string;
  quantity?: string;
  title_pref?: string;
  notes?: string;
  website?: string; // honeypot
  source_path?: string;
  utm?: Record<string, string> | null;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: SpecRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never see this field. Return success so bots move on.
  if (clean(body.website, 100) !== "") {
    return NextResponse.json({ ok: true });
  }

  const company = clean(body.company, 200);
  const contactName = clean(body.contact_name, 200);
  const email = clean(body.email, 320);
  const phone = clean(body.phone, 50) || null;
  const country = clean(body.country, 100);
  const destinationPort = clean(body.destination_port, 200);
  const categorySlug = clean(body.category, 100);
  const spec = clean(body.spec, 2000);
  const quantity = clean(body.quantity, 20);
  const titlePref = clean(body.title_pref, 20);
  const notes = clean(body.notes, 2000) || null;
  const sourcePath = clean(body.source_path, 300) || null;

  const category = getCategory(categorySlug);

  const missing =
    !company ||
    !contactName ||
    !email ||
    !country ||
    !destinationPort ||
    !category ||
    !spec ||
    !QUANTITIES.has(quantity) ||
    !TITLE_PREFS.has(titlePref);
  if (missing) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  let utm: Record<string, string> | null = null;
  if (body.utm && typeof body.utm === "object" && !Array.isArray(body.utm)) {
    utm = {};
    for (const [key, value] of Object.entries(body.utm)) {
      if (
        key.toLowerCase().startsWith("utm_") &&
        typeof value === "string" &&
        Object.keys(utm).length < 10
      ) {
        utm[key.slice(0, 50)] = value.slice(0, 200);
      }
    }
    if (Object.keys(utm).length === 0) utm = null;
  }

  const sql = neon(process.env.DATABASE_URL!);
  try {
    await sql`
      INSERT INTO spec_requests
        (company, contact_name, email, phone, country, destination_port,
         category, spec, quantity, title_pref, notes, source_path, utm)
      VALUES
        (${company}, ${contactName}, ${email}, ${phone}, ${country},
         ${destinationPort}, ${category.slug}, ${spec}, ${quantity},
         ${titlePref}, ${notes}, ${sourcePath}, ${utm ? JSON.stringify(utm) : null})
    `;
  } catch (err) {
    console.error("spec-request insert failed:", err);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 }
    );
  }

  // Emails are best-effort: the request is already saved, so a missing key
  // or Resend outage must never fail the buyer's submission.
  const resendKey = process.env.RESEND_API_KEY;
  const resend = resendKey ? new Resend(resendKey) : null;
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const from = "Vector Auto Exports <notify@mail.vectorautoexports.com>";

  if (resend && notifyEmail) {
    try {
      await resend.emails.send({
        from,
        to: notifyEmail,
        subject: `Spec request: ${category.title} · ${country} · qty ${quantity}`,
        text: [
          `Company: ${company}`,
          `Contact: ${contactName}`,
          `Email: ${email}`,
          `WhatsApp/phone: ${phone ?? "—"}`,
          `Country: ${country}`,
          `Destination port: ${destinationPort}`,
          `Category: ${category.title} (${category.slug})`,
          `Spec: ${spec}`,
          `Quantity: ${quantity}`,
          `Title preference: ${titlePref}`,
          `Notes: ${notes ?? "—"}`,
          `Source page: ${sourcePath ?? "—"}`,
          `UTM: ${utm ? JSON.stringify(utm) : "—"}`,
        ].join("\n"),
      });
    } catch (err) {
      // The request is already saved — don't fail the buyer on a notify hiccup.
      console.error("spec-request notification email failed:", err);
    }
  }

  try {
    await resend?.emails.send({
      from,
      to: email,
      subject: "Spec request received — Vector Auto Exports",
      text: `We received your spec request for ${category.title.toLowerCase()}. We'll reply with sourcing options, photos, and condition reports, usually within 2 business days. Reply to this email if you want to add anything to your request.`,
    });
  } catch (err) {
    console.error("spec-request auto-ack email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
