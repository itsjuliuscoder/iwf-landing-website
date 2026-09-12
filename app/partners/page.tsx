import type { Metadata } from "next";
import { PartnerInquiryForm } from "@/components/PartnerInquiryForm";
import { PARTNER_TIERS } from "@/lib/data/event";

export const metadata: Metadata = {
  title: "Partners",
};

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Resource the festival
      </p>
      <h1 className="mt-2 font-display text-4xl text-navy">Partnership</h1>
      <p className="mt-3 max-w-2xl text-ink/75">
        Underwrite a free, city-wide worship gathering for 10,000+ believers.
        Choose a tier and send an inquiry — our team will follow up by email.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PARTNER_TIERS.map((tier) => (
          <article
            key={tier.id}
            className="flex flex-col rounded-2xl border border-navy/10 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              {tier.name}
            </p>
            <p className="mt-2 font-display text-3xl text-navy">{tier.amount}</p>
            <p className="mt-3 flex-1 text-sm text-ink/70">{tier.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-display text-2xl text-navy">Send an inquiry</h2>
          <p className="mt-2 text-sm text-ink/70">
            Tell us which tier interests you. This is not a payment form — we will
            discuss next steps personally.
          </p>
        </div>
        <PartnerInquiryForm />
      </div>
    </div>
  );
}
