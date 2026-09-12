export const EVENT = {
  name: "International Worship Festival",
  shortName: "IWF 2027",
  dateLabel: "Saturday 9 January 2027",
  startIso: "2027-01-09T09:00:00+01:00",
  venue: "Teslim Balogun Stadium",
  city: "Surulere, Lagos",
  domain: "iworshipfestival.org",
} as const;

export const PARTNER_TIERS = [
  {
    id: "kingdom" as const,
    name: "Kingdom",
    amount: "₦20M+",
    description:
      "Title partnership. Stadium branding, stage recognition, premium hospitality, and national media placement.",
  },
  {
    id: "covenant" as const,
    name: "Covenant",
    amount: "₦8M+",
    description:
      "Major partnership. Prominent venue signage, programme feature, and VIP guest allocations.",
  },
  {
    id: "seed" as const,
    name: "Seed",
    amount: "₦2M+",
    description:
      "Foundational partnership. Logo placement, digital acknowledgement, and festival updates.",
  },
] as const;
