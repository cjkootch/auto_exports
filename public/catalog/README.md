# Catalog images

Drop real photos of loads/units here, one per category, named by slug:

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

Then swap `components/PlaceholderFrame.tsx` usage in
`components/ManifestCard.tsx` and `app/catalog/[slug]/page.tsx` for
`next/image`:

```tsx
<Image
  src={`/catalog/${category.slug}.jpg`}
  alt={category.title}
  width={800}
  height={450}
  className="aspect-[16/9] object-cover"
/>
```

Recommended: 1600×900 (16:9), JPG, under ~300 KB each. No stock photos —
real photos of our loads and units only.
