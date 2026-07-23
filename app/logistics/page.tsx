import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Logistics",
  description:
    "Ports of loading, container options, export documents, transit windows, and payment terms for US vehicle export.",
};

export default function LogisticsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-steel">
        Logistics
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-ink">
        How your units ship
      </h1>

      <div className="mt-8 space-y-10">
        <section>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink">
            Ports of loading
          </h2>
          <p className="mt-3 text-hull">
            Houston is our primary port of loading. Brunswick, Georgia is the
            alternate when routing or vessel schedules make it the better
            option for your destination.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink">
            Container &amp; RoRo options
          </h2>
          <p className="mt-3 text-hull">
            Shared 40&apos; container space for single units or small orders. A
            full 40&apos; high-cube takes roughly 4 sedans or 3 SUVs/vans. RoRo
            is available for drivable units where the destination port accepts
            it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink">
            Documents provided
          </h2>
          <p className="mt-3 text-hull">
            Every shipment includes the export title, bill of lading, and
            commercial invoice. We file the EEI (Electronic Export
            Information) in-house before loading.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink">
            Typical transit windows
          </h2>
          <p className="mt-3 text-hull">
            Indicative ranges from port of loading, not guarantees — actual
            transit depends on carrier schedules and routing:
          </p>
          <ul className="mt-4 space-y-2 font-mono text-sm text-hull">
            <li className="border-l-2 border-flag pl-3">
              Caribbean · 1–2 weeks
            </li>
            <li className="border-l-2 border-flag pl-3">
              Jebel Ali · 4–6 weeks
            </li>
            <li className="border-l-2 border-flag pl-3">Poti · 5–7 weeks</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink">
            Payment
          </h2>
          <p className="mt-3 text-hull">
            Wire transfer against proforma invoice. Sourcing orders carry a
            deposit; the balance is due before loading.
          </p>
        </section>
      </div>

      <div className="mt-12 border-t border-ink/10 pt-8">
        <p className="text-hull">
          Have a destination we haven&apos;t listed? Ask — we quote routing on
          request.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block bg-flag px-6 py-3 font-display text-base font-semibold uppercase tracking-wide text-ink hover:brightness-95"
        >
          Request a spec
        </Link>
      </div>
    </div>
  );
}
