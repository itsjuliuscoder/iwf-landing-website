"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/data/event";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getRemaining(targetMs: number): Remaining {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

export function Countdown() {
  const targetMs = new Date(EVENT.startIso).getTime();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining(targetMs));
    const id = setInterval(() => setRemaining(getRemaining(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (!remaining) {
    return (
      <div
        className="grid grid-cols-4 gap-2 sm:gap-3"
        aria-label="Countdown loading"
      >
        {["Days", "Hours", "Mins", "Secs"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-gold/40 bg-navy/40 px-2 py-3 text-center"
          >
            <div className="font-display text-2xl font-bold text-cream sm:text-3xl">
              —
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-cream/70">
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (remaining.done) {
    return (
      <p className="rounded-xl border border-gold bg-navy/50 px-4 py-3 text-center font-display text-lg text-gold">
        The festival is underway — join us live
      </p>
    );
  }

  const cells = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Mins", value: remaining.minutes },
    { label: "Secs", value: remaining.seconds },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-2 sm:gap-3"
      aria-live="polite"
      aria-label={`Countdown to ${EVENT.dateLabel}`}
    >
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="rounded-xl border border-gold/40 bg-navy/40 px-2 py-3 text-center"
        >
          <div className="font-display text-2xl font-bold tabular-nums text-cream sm:text-3xl">
            {String(cell.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-wider text-cream/70">
            {cell.label}
          </div>
        </div>
      ))}
    </div>
  );
}
