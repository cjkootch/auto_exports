import Link from "next/link";
import Image from "next/image";
import heroPort from "@/public/hero-port.jpg";

const steps = [
  {
    title: "Spec request",
    body: "Tell us the category, make/model/year range, quantity, and destination port.",
  },
  {
    title: "Sourcing & condition report",
    body: "We secure matching units from US auction and dealer channels and send photos and a condition report before you commit.",
  },
  {
    title: "Payment & documents",
    body: "Proforma invoice, payment by wire. You receive the export title, bill of lading, and commercial invoice.",
  },
  {
    title: "Loading & shipping",
    body: "Loaded in Houston or Brunswick — shared or full 40' container, RoRo for drivable units — and shipped to your port.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <Image
          src={heroPort}
          alt="Container-crane terminal at dusk"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
        {/* Legibility overlays: darker at the left where the copy sits */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-36">
          <p className="font-mono text-xs uppercase tracking-widest text-flag">
            Houston · Container &amp; RoRo · Caribbean · Gulf · Caucasus
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold uppercase leading-none tracking-wide sm:text-6xl">
            We source US vehicles for export buyers.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/80">
            Sedans, pickups, vans, and rebuildable units — secured weekly from
            US auction and dealer channels, consolidated in Houston, shipped
            container or RoRo to your port.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="bg-flag px-6 py-3 font-display text-base font-semibold uppercase tracking-wide text-ink hover:brightness-95"
            >
              View sourcing catalog
            </Link>
            <Link
              href="/contact"
              className="border border-paper/40 px-6 py-3 font-display text-base font-semibold uppercase tracking-wide text-paper hover:border-paper"
            >
              Request a spec
            </Link>
          </div>
        </div>
      </section>

      {/* Two-lane strip */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Link
            href="/catalog?lane=clean"
            className="manifest-notch group border border-ink/15 bg-white p-6 hover:border-ink"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-steel">
              Lane · Clean title
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-ink">
              Clean-title export
            </h2>
            <p className="mt-2 text-sm text-hull">
              For Caribbean &amp; LatAm importers and dealer groups:
              clean-title sedans, pickups, cargo vans, and SUVs, ready to
              retail.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-flag group-hover:underline underline-offset-4">
              Browse clean-title catalog →
            </p>
          </Link>
          <Link
            href="/catalog?lane=rebuild"
            className="manifest-notch group border border-ink/15 bg-white p-6 hover:border-ink"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-steel">
              Lane · Rebuildable
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-ink">
              Rebuildable units
            </h2>
            <p className="mt-2 text-sm text-hull">
              For Gulf &amp; Caucasus rebuilders and re-exporters: light-hit
              SUVs, trucks, and luxury units with US salvage/rebuildable
              titles.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-flag group-hover:underline underline-offset-4">
              Browse rebuildable catalog →
            </p>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-hull text-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
            How it works
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title}>
                <p className="font-mono text-sm text-flag">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-paper/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-ink">
          Why buy through us
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-hull">
          <p>
            Vector Auto Exports is the vehicle-export arm of Vector Trade
            Capital, a Houston-based trading company. We handle export
            documentation in-house — title work, EEI filing, bill of lading —
            so your units clear and ship without back-and-forth.
          </p>
          <p>
            We ship to the Caribbean, the Gulf, the Caucasus, and West Africa,
            and you see photos and a condition report on every unit before you
            commit. No surprises at the port.
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-8 inline-block bg-flag px-6 py-3 font-display text-base font-semibold uppercase tracking-wide text-ink hover:brightness-95"
        >
          Request a spec
        </Link>
      </section>
    </>
  );
}
