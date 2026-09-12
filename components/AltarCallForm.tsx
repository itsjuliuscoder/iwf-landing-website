"use client";

import { FormEvent, useState } from "react";

/**
 * Always visible for the duration of the livestream — no time-gating.
 */
export function AltarCallForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      nearestCity: String(form.get("nearestCity") ?? ""),
    };

    try {
      const res = await fetch("/api/altar-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Submission failed");
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      formEl.reset();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-gold bg-navy p-5 text-cream">
        <p className="font-display text-xl">We received your response</p>
        <p className="mt-2 text-sm text-cream/80">
          A follow-up team will connect with you. Keep worshipping with us.
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-gold underline"
          onClick={() => setSuccess(false)}
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-gold/50 bg-navy p-5 text-cream shadow-lg"
      aria-label="Altar call response form"
    >
      <div>
        <h2 className="font-display text-2xl text-gold">Respond to the altar call</h2>
        <p className="mt-1 text-sm text-cream/75">
          Available throughout the livestream. Share your details and we will follow up.
        </p>
      </div>

      <div>
        <label htmlFor="altar-name" className="mb-1 block text-sm">
          Name <span className="text-gold">*</span>
        </label>
        <input
          id="altar-name"
          name="name"
          required
          className="field-input-dark"
        />
      </div>

      <div>
        <label htmlFor="altar-phone" className="mb-1 block text-sm">
          Phone <span className="text-gold">*</span>
        </label>
        <input
          id="altar-phone"
          name="phone"
          type="tel"
          required
          className="field-input-dark"
        />
      </div>

      <div>
        <label htmlFor="altar-city" className="mb-1 block text-sm">
          Nearest city (optional)
        </label>
        <input id="altar-city" name="nearestCity" className="field-input-dark" />
      </div>

      {error && (
        <p className="rounded-lg bg-red-900/40 px-3 py-2 text-sm text-red-100" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-navy transition hover:brightness-105 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "I respond"}
      </button>
    </form>
  );
}
