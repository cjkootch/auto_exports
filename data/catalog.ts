export type Lane = "clean" | "rebuild";

export interface CatalogCategory {
  slug: string;
  /** Manifest code shown on the card strip, e.g. VAE-01 */
  code: string;
  title: string;
  lane: Lane;
  spec: string;
  note: string;
}

export const LANE_LABELS: Record<Lane, string> = {
  clean: "Clean title",
  rebuild: "Rebuildable",
};

export const SOURCING_NOTE =
  "Sourced weekly. Photos and condition report provided before commitment.";

export const CATALOG: CatalogCategory[] = [
  {
    slug: "clean-sedans",
    code: "VAE-01",
    title: "Clean-title sedans",
    lane: "clean",
    spec: "2018–2023 Toyota Corolla, Camry, Honda Accord, Civic · 30–80K mi · clean US title",
    note: SOURCING_NOTE,
  },
  {
    slug: "pickups-4x4",
    code: "VAE-02",
    title: "Pickups & 4x4",
    lane: "clean",
    spec: "2017–2023 Tacoma, F-150, Silverado, Ram 1500 · 4x4 available · work-ready",
    note: SOURCING_NOTE,
  },
  {
    slug: "cargo-vans",
    code: "VAE-03",
    title: "Cargo & passenger vans",
    lane: "clean",
    spec: "2016–2022 Ford Transit, RAM ProMaster, Mercedes Sprinter · high-roof available",
    note: SOURCING_NOTE,
  },
  {
    slug: "compact-suvs",
    code: "VAE-04",
    title: "Compact & mid-size SUVs",
    lane: "clean",
    spec: "2018–2023 RAV4, CR-V, Highlander, Explorer",
    note: SOURCING_NOTE,
  },
  {
    slug: "rebuildable-suv",
    code: "VAE-05",
    title: "Rebuildable SUVs & trucks",
    lane: "rebuild",
    spec: "Late-model, light-hit collision units · run & drive available · US salvage/rebuildable title",
    note: SOURCING_NOTE,
  },
  {
    slug: "rebuildable-lux",
    code: "VAE-06",
    title: "Rebuildable luxury",
    lane: "rebuild",
    spec: "BMW X5, Mercedes GLE, Lexus RX · cosmetic/light structural",
    note: SOURCING_NOTE,
  },
  {
    slug: "luxury-request",
    code: "VAE-07",
    title: "Luxury & specialty (on request)",
    lane: "clean",
    spec: "Lexus GX/LX, Land Cruiser, Range Rover, Escalade · sourced to order",
    note: SOURCING_NOTE,
  },
  {
    slug: "heavy-fleet",
    code: "VAE-08",
    title: "Fleet & light commercial (on request)",
    lane: "clean",
    spec: "Box trucks, cutaways, work fleets · multi-unit orders",
    note: SOURCING_NOTE,
  },
];

export function getCategory(slug: string): CatalogCategory | undefined {
  return CATALOG.find((c) => c.slug === slug);
}
