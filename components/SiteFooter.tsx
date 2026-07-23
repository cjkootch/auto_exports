import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-hull text-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold uppercase tracking-wide">
              Vector Auto Exports
            </p>
            <p className="mt-2 max-w-md text-sm text-paper/80">
              Vector Auto Exports is a Vector Trade Capital company. Houston,
              Texas.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-mono text-[11px] uppercase tracking-widest text-steel">
              Get in touch
            </p>
            <p className="mt-2">
              <a
                href="mailto:notify@mail.vectorautoexports.com"
                className="underline underline-offset-4 hover:text-flag"
              >
                Email us
              </a>
            </p>
            <p className="mt-1">
              <Link
                href="/contact"
                className="underline underline-offset-4 hover:text-flag"
              >
                Request a spec
              </Link>
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-paper/10 pt-4 font-mono text-[11px] uppercase tracking-widest text-steel">
          US vehicle sourcing &amp; export · Container &amp; RoRo
        </p>
      </div>
    </footer>
  );
}
