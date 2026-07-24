import Image from "next/image";
import { CATALOG_IMAGES } from "@/data/catalog-images";

/**
 * Representative catalog image for a category, cropped to 16:9. Falls back
 * to a neutral hull panel if no image is mapped for the slug.
 */
export default function CatalogImage({
  slug,
  alt,
  sizes,
  priority = false,
}: {
  slug: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const img = CATALOG_IMAGES[slug];
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-hull">
      {img && (
        <Image
          src={img}
          alt={alt}
          fill
          sizes={sizes}
          placeholder="blur"
          priority={priority}
          className="object-cover"
        />
      )}
    </div>
  );
}
