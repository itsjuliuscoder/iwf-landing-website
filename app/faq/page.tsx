import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

const faqs = [
  {
    q: "Is the event really free?",
    a: "Yes. IWF 2027 has no ticketing or payment. Register online to receive QR accreditation for gate entry.",
  },
  {
    q: "Where is the venue?",
    a: "Teslim Balogun Stadium, Alhaji Masha Road, Surulere, Lagos. Plan extra travel time for Surulere traffic on event day.",
  },
  {
    q: "What time should I arrive?",
    a: "Session One begins at 9:00 AM WAT. Arrive early for accreditation queues. Session Two runs 4:00 PM–9:30 PM.",
  },
  {
    q: "How does accreditation work?",
    a: "After registration you receive a QR code encoding your registration ID (IWF27-XXXXXXXX). Gate staff scan or look up the ID. Keep the confirmation email accessible offline if possible.",
  },
  {
    q: "Is the stadium accessible?",
    a: "Accessible seating and assistance points will be signed on site. Contact press@iworshipfestival.org ahead of time if you need specific mobility support so stewards can prepare.",
  },
  {
    q: "How do I get there by public transport?",
    a: "BRT and danfo routes serve Surulere / National Stadium corridor. Ride-hailing drop-off points will be marshalled near the stadium approaches. Avoid parking inside restricted zones.",
  },
  {
    q: "What about safety and security?",
    a: "Expect bag checks at gates. Leave large bags at home where possible. Follow steward instructions. In an emergency, move calmly toward marked exits and await announcements.",
  },
  {
    q: "Can I watch online?",
    a: "Yes — use the /live hub for YouTube and Facebook embeds. The altar-call response form stays available for the entire stream.",
  },
  {
    q: "How do churches bring groups?",
    a: "Register with your group size on one form, or register individuals separately. v1 does not block duplicate emails — coordinate what works for your group.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Logistics &amp; care
      </p>
      <h1 className="mt-2 font-display text-4xl text-navy">FAQ</h1>
      <p className="mt-3 text-ink/75">
        Practical answers for attending Teslim Balogun Stadium on 9 January 2027.
      </p>

      <dl className="mt-10 space-y-4">
        {faqs.map((item) => (
          <div
            key={item.q}
            className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm"
          >
            <dt className="font-display text-lg text-navy">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink/75">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
