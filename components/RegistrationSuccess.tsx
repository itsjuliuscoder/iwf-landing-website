"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { REGISTRATION_STORAGE_KEY } from "@/components/RegistrationForm";

type Stored = {
  registrationId: string;
  qrDataUrl: string;
  fullName: string;
};

export function RegistrationSuccess() {
  const [data, setData] = useState<Stored | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(REGISTRATION_STORAGE_KEY);
      if (raw) {
        setData(JSON.parse(raw) as Stored);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <p className="text-center text-ink/60">Loading your accreditation…</p>;
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-navy/10 bg-white p-6 text-center shadow-sm">
        <h1 className="font-display text-2xl text-navy">Registration confirmed</h1>
        <p className="mt-3 text-sm text-ink/70">
          We could not find your QR on this device (for example after opening the
          confirmation email on another phone). Check your inbox for your registration
          ID and QR code.
        </p>
        <Link
          href="/register"
          className="mt-6 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream"
        >
          Register again
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-navy/10 bg-white p-6 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">You&apos;re in</p>
      <h1 className="mt-2 font-display text-3xl text-navy">Welcome, {data.fullName}</h1>
      <p className="mt-2 text-sm text-ink/70">
        Save this QR code for gate accreditation. A copy was also sent to your email.
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.qrDataUrl}
        alt={`QR code for ${data.registrationId}`}
        className="mx-auto mt-6 h-64 w-64 rounded-xl border border-gold/40 bg-white p-2"
      />

      <p className="mt-4 font-mono text-lg font-semibold tracking-wide text-navy">
        {data.registrationId}
      </p>
      <p className="mt-2 text-xs text-ink/50">
        Present this code at Teslim Balogun Stadium on 9 January 2027.
      </p>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy"
        >
          Back home
        </Link>
        <Link
          href="/programme"
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy"
        >
          View programme
        </Link>
      </div>
    </div>
  );
}
