import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programme",
};

const sessions = [
  {
    title: "Session One",
    time: "9:00 AM – 2:00 PM WAT",
    focus: "Morning praise & worship",
    items: [
      "Gates open & accreditation",
      "Mass choir & opening worship",
      "Ministerial worship sets",
      "Word & prayer",
      "Session close",
    ],
  },
  {
    title: "Session Two",
    time: "4:00 PM – 9:30 PM WAT",
    focus: "Evening encounter",
    items: [
      "Re-entry & evening worship",
      "Featured ministers & artists",
      "Teaching moment",
      "Altar call & response",
      "Closing celebration",
    ],
  },
];

export default function ProgrammePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Saturday 9 January 2027
      </p>
      <h1 className="mt-2 font-display text-4xl text-navy">Programme</h1>
      <p className="mt-3 max-w-2xl text-ink/75">
        Two sessions at Teslim Balogun Stadium. Arrive early for accreditation —
        bring your registration QR or ID.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {sessions.map((session) => (
          <article
            key={session.title}
            className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              {session.time}
            </p>
            <h2 className="mt-2 font-display text-3xl text-navy">{session.title}</h2>
            <p className="mt-1 text-sm font-medium text-navy/70">{session.focus}</p>
            <ol className="mt-6 space-y-3">
              {session.items.map((item, i) => (
                <li key={item} className="flex gap-3 text-sm text-ink/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream font-mono text-xs text-navy">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink/60">
        Schedule details may be refined closer to the event. Check back for
        confirmed minister timings.
      </p>
    </div>
  );
}
