import Link from "next/link";
import type { CatalogCategory } from "@/data/catalog";
import { LANE_LABELS } from "@/data/catalog";
import CatalogImage from "@/components/CatalogImage";

export default function ManifestCard({
  category,
}: {
  category: CatalogCategory;
}) {
  return (
    <article className="manifest-notch flex flex-col border border-ink/15 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b border-ink/10 bg-ink px-4 py-2">
        <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-paper">
          {category.code} · {category.title}
        </span>
        <span
          className={`shrink-0 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
            category.lane === "rebuild"
              ? "bg-flag text-ink"
              : "bg-paper text-ink"
          }`}
        >
          {LANE_LABELS[category.lane]}
        </span>
      </div>

      <CatalogImage
        slug={category.slug}
        alt={category.title}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        <p className="font-mono text-xs leading-relaxed text-hull">
          {category.spec}
        </p>
        <p className="text-sm text-steel">{category.note}</p>
        <div className="mt-auto pt-2">
          <Link
            href={`/catalog/${category.slug}`}
            className="block bg-flag px-4 py-2.5 text-center font-display text-sm font-semibold uppercase tracking-wide text-ink hover:brightness-95"
          >
            Request this spec
          </Link>
        </div>
      </div>
    </article>
  );
}
