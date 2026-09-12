import type { Metadata } from "next";
import Link from "next/link";
import { EVENT } from "@/lib/data/event";

export const metadata: Metadata = {
  title: "Press",
};

export default function PressPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Media kit
      </p>
      <h1 className="mt-2 font-display text-4xl text-navy">Press</h1>

      <section className="prose-iwf mt-8 max-w-3xl rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <h2>Boilerplate</h2>
        <p>
          The International Worship Festival (IWF) 2027 is a free, one-day gathering
          of worship at {EVENT.venue}, {EVENT.city}, on {EVENT.dateLabel}. Hosted
          for 10,000+ attendees and a global livestream audience, IWF unites
          churches and nations for praise, teaching, and an open altar call —
          without ticketing barriers.
        </p>
        <p>
          Digital registration at {EVENT.domain} issues QR accreditation for gate
          entry. Partnership tiers (Kingdom, Covenant, Seed) resource the stadium
          production. Media enquiries: press@iworshipfestival.org.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-navy">Logo downloads</h2>
        <p className="mt-2 text-sm text-ink/70">
          Placeholder assets for layout — replace with final brand files before launch.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <a
              href="/press/iwf-logo-primary.svg"
              download
              className="font-semibold text-navy underline decoration-gold underline-offset-2"
            >
              Primary logo (SVG)
            </a>
          </li>
          <li>
            <a
              href="/press/iwf-logo-mono.svg"
              download
              className="font-semibold text-navy underline decoration-gold underline-offset-2"
            >
              Mono logo (SVG)
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-navy px-6 py-6 text-cream">
        <h2 className="font-display text-2xl text-gold">Press contact</h2>
        <p className="mt-2 text-sm text-cream/80">
          Interview requests, photo credentials, and livestream embeds.
        </p>
        <a
          href="mailto:press@iworshipfestival.org"
          className="mt-3 inline-block font-semibold text-gold hover:underline"
        >
          press@iworshipfestival.org
        </a>
        <p className="mt-4 text-sm">
          <Link href="/register" className="text-cream/80 underline hover:text-gold">
            Register for on-site coverage accreditation
          </Link>
        </p>
      </section>
    </div>
  );
}
