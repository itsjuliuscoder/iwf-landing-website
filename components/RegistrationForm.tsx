"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { COUNTRIES } from "@/lib/data/countries";

const STORAGE_KEY = "iwf27_registration";

export function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      churchAffiliation: String(form.get("churchAffiliation") ?? ""),
      country: String(form.get("country") ?? ""),
      groupSize: Number(form.get("groupSize") ?? 1),
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Registration failed");
        setSubmitting(false);
        return;
      }

      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          registrationId: data.registrationId,
          qrDataUrl: data.qrDataUrl,
          fullName: data.fullName,
        })
      );
      router.push("/register/success");
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field label="Full name" htmlFor="fullName" required>
        <input
          id="fullName"
          name="fullName"
          required
          autoComplete="name"
          className="field-input"
          placeholder="As it should appear on accreditation"
        />
      </Field>

      <Field label="Phone" htmlFor="phone" required>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="field-input"
          placeholder="+234…"
        />
      </Field>

      <Field label="Email" htmlFor="email" required>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field-input"
          placeholder="We'll send your QR code here"
        />
      </Field>

      <Field label="Church affiliation (optional)" htmlFor="churchAffiliation">
        <input
          id="churchAffiliation"
          name="churchAffiliation"
          className="field-input"
          placeholder="Church or fellowship name"
        />
      </Field>

      <Field label="Country" htmlFor="country" required>
        <select id="country" name="country" required defaultValue="NG" className="field-input">
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Group size" htmlFor="groupSize" required>
        <input
          id="groupSize"
          name="groupSize"
          type="number"
          min={1}
          max={50}
          defaultValue={1}
          required
          className="field-input"
        />
      </Field>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-navy px-6 py-3 font-semibold text-cream transition hover:bg-navy/90 disabled:opacity-60"
      >
        {submitting ? "Registering…" : "Complete free registration"}
      </button>

      <p className="text-center text-xs text-ink/60">
        Free entry. Confirmation by email with your QR accreditation. No payment required.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      {children}
    </div>
  );
}

export { STORAGE_KEY as REGISTRATION_STORAGE_KEY };
