import type { StaticImageData } from "next/image";
import cleanSedans from "@/public/catalog/clean-sedans.jpg";
import pickups4x4 from "@/public/catalog/pickups-4x4.jpg";
import cargoVans from "@/public/catalog/cargo-vans.jpg";
import compactSuvs from "@/public/catalog/compact-suvs.jpg";
import rebuildableSuv from "@/public/catalog/rebuildable-suv.jpg";
import rebuildableLux from "@/public/catalog/rebuildable-lux.jpg";
import luxuryRequest from "@/public/catalog/luxury-request.jpg";
import heavyFleet from "@/public/catalog/heavy-fleet.jpg";

/**
 * Slug -> representative catalog image. These are licensed stock photos
 * (see public/catalog/CREDITS.md) standing in until real photos of loads
 * and units are available — drop a same-named JPG into public/catalog/ to
 * swap any one out.
 */
export const CATALOG_IMAGES: Record<string, StaticImageData> = {
  "clean-sedans": cleanSedans,
  "pickups-4x4": pickups4x4,
  "cargo-vans": cargoVans,
  "compact-suvs": compactSuvs,
  "rebuildable-suv": rebuildableSuv,
  "rebuildable-lux": rebuildableLux,
  "luxury-request": luxuryRequest,
  "heavy-fleet": heavyFleet,
};
