"use client";

import { FormEvent, useState } from "react";

export function PartnerInquiryForm() {
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
      tier: String(form.get("tier") ?? ""),
      organizationName: String(form.get("organizationName") ?? ""),
      contactName: String(form.get("contactName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/partner-inquiry", {
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
      <div className="rounded-2xl border border-gold/40 bg-cream p-6 text-center">
        <p className="font-display text-xl text-navy">Thank you</p>
        <p className="mt-2 text-sm text-ink/70">
          Our partnerships team will follow up by email shortly.
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-gold underline"
          onClick={() => setSuccess(false)}
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label htmlFor="tier" className="mb-1.5 block text-sm font-medium text-navy">
          Partnership tier <span className="text-gold">*</span>
        </label>
        <select id="tier" name="tier" required defaultValue="seed" className="field-input">
          <option value="kingdom">Kingdom — ₦20M+</option>
          <option value="covenant">Covenant — ₦8M+</option>
          <option value="seed">Seed — ₦2M+</option>
        </select>
      </div>

      <div>
        <label htmlFor="organizationName" className="mb-1.5 block text-sm font-medium text-navy">
          Organization <span className="text-gold">*</span>
        </label>
        <input id="organizationName" name="organizationName" required className="field-input" />
      </div>

      <div>
        <label htmlFor="contactName" className="mb-1.5 block text-sm font-medium text-navy">
          Contact name <span className="text-gold">*</span>
        </label>
        <input id="contactName" name="contactName" required className="field-input" />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
          Email <span className="text-gold">*</span>
        </label>
        <input id="email" name="email" type="email" required className="field-input" />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
          Phone <span className="text-gold">*</span>
        </label>
        <input id="phone" name="phone" type="tel" required className="field-input" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
          Message (optional)
        </label>
        <textarea id="message" name="message" rows={4} className="field-input" />
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-navy transition hover:brightness-105 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send partnership inquiry"}
      </button>
    </form>
  );
}
