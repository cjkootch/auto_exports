import type { Metadata } from "next";
import SpecRequestForm from "@/components/SpecRequestForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a spec request — category, make/model/year range, quantity, destination port. Sourcing options and photos usually within 2 business days.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-steel">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-ink">
        Request a spec
      </h1>
      <p className="mt-3 text-hull">
        Tell us what you need — category, make/model/year range, quantity, and
        destination port. We reply with sourcing options, photos, and
        condition reports, usually within 2 business days.
      </p>
      <p className="mt-2 text-sm text-steel">
        Prefer email? Write to{" "}
        <a
          href="mailto:notify@vectorautoexports.com"
          className="underline underline-offset-4 hover:text-ink"
        >
          notify@vectorautoexports.com
        </a>
        .
      </p>
      <div className="mt-8">
        <SpecRequestForm />
      </div>
    </div>
  );
}
