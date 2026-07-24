import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATALOG, LANE_LABELS, getCategory } from "@/data/catalog";
import CatalogImage from "@/components/CatalogImage";
import SpecRequestForm from "@/components/SpecRequestForm";

export function generateStaticParams() {
  return CATALOG.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: category.title,
    description: `${category.spec}. ${category.note}`,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/catalog"
        className="font-mono text-xs uppercase tracking-widest text-steel hover:text-ink"
      >
        ← Sourcing catalog
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-steel">
              {category.code}
            </span>
            <span
              className={`px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                category.lane === "rebuild"
                  ? "bg-flag text-ink"
                  : "bg-ink text-paper"
              }`}
            >
              {LANE_LABELS[category.lane]}
            </span>
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-ink">
            {category.title}
          </h1>
          <p className="mt-4 font-mono text-sm leading-relaxed text-hull">
            {category.spec}
          </p>
          <p className="mt-3 text-steel">{category.note}</p>
          <div className="mt-6 manifest-notch overflow-hidden border border-ink/15">
            <CatalogImage
              slug={category.slug}
              alt={category.title}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink">
            Request this spec
          </h2>
          <p className="mt-2 mb-6 text-sm text-steel">
            Tell us exactly what you need. We reply with sourcing options,
            photos, and condition reports — usually within 2 business days.
          </p>
          <SpecRequestForm defaultCategory={category.slug} />
        </div>
      </div>
    </div>
  );
}
