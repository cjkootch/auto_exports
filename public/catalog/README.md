# Catalog images

Each category has a representative 16:9 image at `public/catalog/<slug>.jpg`,
wired up in `data/catalog-images.ts` and rendered by
`components/CatalogImage.tsx` (via `next/image` static import, so cropping,
sizing, and blur-up placeholders are automatic).

Current images are **licensed stock** (Pexels — see `CREDITS.md`) standing in
until real photos of loads/units are available.

## Swapping in a real photo

Replace any file with a same-named JPG (ideally ~1600×900, 16:9, under ~300 KB):

```
public/catalog/clean-sedans.jpg
public/catalog/pickups-4x4.jpg
public/catalog/cargo-vans.jpg
public/catalog/compact-suvs.jpg
public/catalog/rebuildable-suv.jpg
public/catalog/rebuildable-lux.jpg
public/catalog/luxury-request.jpg
public/catalog/heavy-fleet.jpg
```

No code change needed — the filename is the only link. If you add a new
category, add its image and a matching entry in `data/catalog-images.ts`.
When you drop in real photos, remove the corresponding row from `CREDITS.md`.
