import Link from "next/link";
import Image from "next/image";
import logoBlack from "@/public/brand/logo-black-stacked.png";

const nav = [
  { href: "/catalog", label: "Sourcing catalog" },
  { href: "/logistics", label: "Logistics" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoBlack}
            alt="Vector Auto Exports"
            priority
            className="h-11 w-auto sm:h-12"
          />
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-steel md:inline">
            Houston · US
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink hover:text-hull hover:underline underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
