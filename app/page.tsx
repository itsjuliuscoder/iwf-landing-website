import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MinistersTeaser } from "@/components/home/MinistersTeaser";
import { ProgrammePreview } from "@/components/home/ProgrammePreview";
import { EVENT } from "@/lib/data/event";
import { getRegistrationCount } from "@/lib/stats";

export const revalidate = 60;

export default async function HomePage() {
  const registered = await getRegistrationCount();

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-cream">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #C9A22755, transparent 40%), radial-gradient(circle at 80% 60%, #C9A22733, transparent 45%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Free entry · Lagos · Nations gathering
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              International Worship Festival{" "}
              <span className="text-gold">2027</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-cream/80 sm:text-lg">
              One day. Two sessions. Ten thousand voices lifting Jesus at{" "}
              {EVENT.venue}, {EVENT.city}.
            </p>
            <p className="mt-3 text-sm font-medium text-gold">
              {EVENT.dateLabel} · Gates open for Session One at 9:00 AM WAT
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-center font-semibold text-navy transition hover:brightness-105"
              >
                Register free
              </Link>
              <Link
                href="/live"
                className="inline-flex items-center justify-center rounded-full border border-cream/30 px-6 py-3 text-center font-semibold text-cream transition hover:border-gold hover:text-gold"
              >
                Watch live
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <Countdown />
            <div className="rounded-2xl border border-gold/30 bg-cream/5 px-5 py-4 backdrop-blur">
              <p className="text-xs uppercase tracking-widest text-cream/60">
                Registered so far
              </p>
              <p className="mt-1 font-display text-4xl font-bold tabular-nums text-gold">
                {registered.toLocaleString("en-NG")}
              </p>
              <p className="mt-1 text-sm text-cream/70">
                Believers preparing for the stadium — updates every minute.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Vision
            </p>
            <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">
              A city-wide altar. A global livestream. One King.
            </h2>
          </div>
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>
              IWF 2027 gathers churches, choirs, and believers from Nigeria and
              the nations for a landmark day of worship at Teslim Balogun Stadium.
              No tickets. No barriers. Just open access and a clear call to
              encounter Jesus.
            </p>
            <p>
              Whether you are on the pitch, in the stands, or watching from
              another continent, you are part of the same room — registering for
              accreditation, streaming live, and responding when the altar call
              goes out.
            </p>
            <p>
              We are contending for 10,000+ in the stadium and representation from
              15+ nations — a visible sign that worship still draws the peoples
              together under one Name.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Nations welcome",
              body: "Register with your country so we can track representation toward 15+ nations.",
              href: "/register",
            },
            {
              title: "Partner & resource",
              body: "Kingdom, Covenant, and Seed partnership tiers to underwrite the stadium experience.",
              href: "/partners",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition hover:border-gold/50 hover:shadow-md"
            >
              <h3 className="font-display text-xl text-navy">{card.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{card.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <HowItWorks />
      <ProgrammePreview />
      <MinistersTeaser />
    </>
  );
}
