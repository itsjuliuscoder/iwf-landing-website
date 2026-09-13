import Link from "next/link";
import { programmeSessions } from "@/lib/data/programme";

export function ProgrammePreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Programme
          </p>
          <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">
            One day. Two holy windows.
          </h2>
          <p className="mt-3 text-ink/75 leading-relaxed">
            Morning praise that fills the stands, then an evening encounter that
            carries the altar call across the stadium and the livestream.
          </p>
        </div>
        <Link
          href="/programme"
          className="shrink-0 text-sm font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-gold"
        >
          Full programme
        </Link>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {programmeSessions.map((session) => (
          <article
            key={session.title}
            className="border-l-4 border-gold bg-white px-5 py-6 shadow-sm sm:px-6"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              {session.time}
            </p>
            <h3 className="mt-2 font-display text-2xl text-navy">{session.title}</h3>
            <p className="mt-1 text-sm font-medium text-navy/70">{session.focus}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
