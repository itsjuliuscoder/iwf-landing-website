import Link from "next/link";
import { ministers } from "@/lib/data/ministers";

export function MinistersTeaser() {
  const featured = ministers.slice(0, 4);

  return (
    <section className="bg-navy text-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Line-up
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              Ministers gathering for Lagos
            </h2>
            <p className="mt-3 text-cream/75 leading-relaxed">
              Worship leaders, gospel artists, and word ministers from home and
              the nations. Names land here as invitations are confirmed.
            </p>
          </div>
          <Link
            href="/ministers"
            className="shrink-0 text-sm font-semibold text-gold underline underline-offset-4 hover:text-cream"
          >
            View all ministers
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((m) => (
            <article key={m.id} className="overflow-hidden rounded-xl bg-cream/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.name}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                  {m.role}
                </p>
                <h3 className="mt-1 font-display text-lg">{m.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
