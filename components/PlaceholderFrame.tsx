/**
 * Neutral placeholder panel for catalog imagery.
 * Real photos go in /public/catalog/ — see /public/catalog/README.md for the
 * swap path. Do not replace with stock photos.
 */
export default function PlaceholderFrame({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-[16/9] items-center justify-center bg-hull"
    >
      <span className="select-none px-4 text-center font-display text-xl font-bold uppercase tracking-[0.25em] text-steel/60">
        {label}
      </span>
    </div>
  );
}
