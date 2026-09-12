import type { Metadata } from "next";
import { ministers } from "@/lib/data/ministers";

export const metadata: Metadata = {
  title: "Ministers",
};

export default function MinistersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Line-up
      </p>
      <h1 className="mt-2 font-display text-4xl text-navy">Ministers</h1>
      <p className="mt-3 max-w-2xl text-ink/75">
        Confirmed names will replace placeholders as invitations are accepted.
        This grid is sourced from static data and ready to swap to a CMS later.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ministers.map((m) => (
          <article
            key={m.id}
            className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-navy/5">
              {/* Placeholder SVGs — swap for next/image when photo assets land */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                {m.role}
              </p>
              <h2 className="mt-1 font-display text-2xl text-navy">{m.name}</h2>
              <p className="mt-2 text-sm text-ink/70">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
