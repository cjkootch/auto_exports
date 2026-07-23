"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATALOG, type Lane } from "@/data/catalog";
import ManifestCard from "@/components/ManifestCard";

type Filter = "all" | Lane;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "clean", label: "Clean title" },
  { value: "rebuild", label: "Rebuildable" },
];

export default function CatalogGrid() {
  const searchParams = useSearchParams();
  const laneParam = searchParams.get("lane");
  const [filter, setFilter] = useState<Filter>(
    laneParam === "clean" || laneParam === "rebuild" ? laneParam : "all"
  );

  const visible =
    filter === "all" ? CATALOG : CATALOG.filter((c) => c.lane === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter catalog by title type"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={`px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider border ${
              filter === f.value
                ? "border-ink bg-ink text-paper"
                : "border-ink/25 bg-white text-ink hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((category) => (
          <ManifestCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
