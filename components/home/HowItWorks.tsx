import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Register free",
    body: "Share your name, phone, email, country, and group size. No payment — accreditation is free for every attendee.",
  },
  {
    n: "02",
    title: "Receive your QR",
    body: "We email your unique registration ID and QR code. Save it on your phone or print it for the gate.",
  },
  {
    n: "03",
    title: "Enter the stadium",
    body: "Present your QR at Teslim Balogun Stadium. Stewards scan the ID and welcome you into the gathering.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="border-y border-navy/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            How it works
          </p>
          <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">
            From signup to the gate in three steps
          </h2>
          <p className="mt-3 text-ink/75 leading-relaxed">
            Frictionless entry for ten thousand voices. Register once, keep your
            QR close, and walk into worship without tickets or queues of confusion.
          </p>
        </div>

        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="relative">
              <span className="font-display text-4xl font-semibold text-gold/80">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-xl text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Link
            href="/register"
            className="inline-flex rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-navy/90"
          >
            Start free registration
          </Link>
        </div>
      </div>
    </section>
  );
}
