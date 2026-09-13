export interface ProgrammeSession {
  title: string;
  time: string;
  focus: string;
  items: string[];
}

export const programmeSessions: ProgrammeSession[] = [
  {
    title: "Session One",
    time: "9:00 AM – 2:00 PM WAT",
    focus: "Morning praise & worship",
    items: [
      "Gates open & accreditation",
      "Mass choir & opening worship",
      "Ministerial worship sets",
      "Word & prayer",
      "Session close",
    ],
  },
  {
    title: "Session Two",
    time: "4:00 PM – 9:30 PM WAT",
    focus: "Evening encounter",
    items: [
      "Re-entry & evening worship",
      "Featured ministers & artists",
      "Teaching moment",
      "Altar call & response",
      "Closing celebration",
    ],
  },
];
