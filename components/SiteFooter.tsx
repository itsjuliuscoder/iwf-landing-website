import Link from "next/link";
import { EVENT } from "@/lib/data/event";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-navy/10 bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold">{EVENT.shortName}</p>
          <p className="mt-2 text-sm text-cream/80">
            {EVENT.dateLabel}
            <br />
            {EVENT.venue}, {EVENT.city}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm text-cream/85">
            <li>
              <Link href="/register" className="hover:text-gold">
                Free registration
              </Link>
            </li>
            <li>
              <Link href="/live" className="hover:text-gold">
                Livestream
              </Link>
            </li>
            <li>
              <Link href="/partners" className="hover:text-gold">
                Partner with us
              </Link>
            </li>
            <li>
              <Link href="/press" className="hover:text-gold">
                Press kit
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-gold">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Contact
          </p>
          <p className="mt-3 text-sm text-cream/85">
            Media &amp; enquiries
            <br />
            <a
              href="mailto:press@iworshipfestival.org"
              className="text-gold hover:underline"
            >
              press@iworshipfestival.org
            </a>
          </p>
          <p className="mt-4 text-xs text-cream/60">
            Free entry · No ticketing · Confirmation by email only
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {EVENT.name}. All rights reserved.
      </div>
    </footer>
  );
}
