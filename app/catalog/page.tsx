import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogGrid from "@/components/CatalogGrid";

export const metadata: Metadata = {
  title: "Sourcing catalog",
  description:
    "Representative sourcing catalog: clean-title sedans, pickups, vans, SUVs, and rebuildable units secured weekly from US auction and dealer channels.",
};

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-steel">
        Sourcing catalog
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-ink">
        What we secure every week
      </h1>
      <p className="mt-3 max-w-2xl text-hull">
        A representative catalog of what we routinely source from US auction
        and dealer channels. No live inventory here — tell us the spec you
        need and we send sourcing options with photos and condition reports.
      </p>
      <div className="mt-8">
        <Suspense>
          <CatalogGrid />
        </Suspense>
      </div>
    </div>
  );
}
