"use client";

import { useState } from "react";
import { CATALOG } from "@/data/catalog";
import { UTM_STORAGE_KEY } from "@/components/UtmCapture";

const COUNTRIES = [
  "Dominican Republic",
  "Jamaica",
  "Trinidad & Tobago",
  "Guyana",
  "Suriname",
  "Haiti",
  "Bahamas",
  "Barbados",
  "United Arab Emirates",
  "Georgia",
  "Jordan",
  "Oman",
  "Azerbaijan",
  "Nigeria",
  "Ghana",
  "Senegal",
  "Other",
];

const QUANTITIES = ["1", "2–5", "6–20", "20+"];
const TITLE_PREFS = ["Clean", "Rebuildable", "Either"];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-ink/25 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-steel";
const labelClass =
  "block font-mono text-[11px] font-medium uppercase tracking-wider text-hull mb-1.5";

export default function SpecRequestForm({
  defaultCategory,
}: {
  defaultCategory?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    let utm: Record<string, string> | null = null;
    try {
      const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
      if (raw) utm = JSON.parse(raw);
    } catch {
      // best-effort attribution only
    }

    try {
      const res = await fetch("/api/spec-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source_path: window.location.pathname,
          utm,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Could not send your request. Please try again or email us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-cleared bg-cleared/10 px-5 py-6">
        <p className="font-display text-xl font-semibold uppercase tracking-wide text-cleared">
          Request received
        </p>
        <p className="mt-2 text-sm text-ink">
          You&apos;ll get sourcing options and photos by email, usually within
          2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company name *
          </label>
          <input
            id="company"
            name="company"
            required
            maxLength={200}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact_name" className={labelClass}>
            Contact name *
          </label>
          <input
            id="contact_name"
            name="contact_name"
            required
            maxLength={200}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={320}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            WhatsApp / phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={50}
            placeholder="+1 …"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="country" className={labelClass}>
            Country *
          </label>
          <select id="country" name="country" required className={inputClass}>
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="destination_port" className={labelClass}>
            Destination port *
          </label>
          <input
            id="destination_port"
            name="destination_port"
            required
            maxLength={200}
            placeholder="e.g. Rio Haina, Jebel Ali, Poti"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={defaultCategory ?? ""}
            className={inputClass}
          >
            <option value="">Select category</option>
            {CATALOG.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className={labelClass}>
            Quantity *
          </label>
          <select
            id="quantity"
            name="quantity"
            required
            className={inputClass}
          >
            <option value="">Select quantity</option>
            {QUANTITIES.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="spec" className={labelClass}>
            Make / model / year range *
          </label>
          <textarea
            id="spec"
            name="spec"
            required
            rows={3}
            maxLength={2000}
            placeholder="e.g. 2019–2022 Toyota Corolla LE, under 60K miles"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="title_pref" className={labelClass}>
            Title preference *
          </label>
          <select
            id="title_pref"
            name="title_pref"
            required
            className={inputClass}
          >
            <option value="">Select preference</option>
            {TITLE_PREFS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            maxLength={2000}
            className={inputClass}
          />
        </div>
        {/* Honeypot — hidden from real users, bots fill it in */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      {status === "error" && errorMsg && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full bg-flag px-6 py-3 font-display text-base font-semibold uppercase tracking-wide text-ink hover:brightness-95 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send spec request"}
      </button>
    </form>
  );
}
