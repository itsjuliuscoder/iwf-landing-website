/**
 * Static minister line-up. Designed to be swapped for a CMS/DB source later.
 */
export interface Minister {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const ministers: Minister[] = [
  {
    id: "tba-1",
    name: "Minister TBA",
    role: "Worship Leader",
    image: "/ministers/placeholder.svg",
    bio: "Line-up announcements coming soon. Stay tuned for international and home-based worship ministers.",
  },
  {
    id: "tba-2",
    name: "Minister TBA",
    role: "Guest Minister",
    image: "/ministers/placeholder.svg",
    bio: "Powerful ministry moments planned across both sessions. Names will be published as confirmed.",
  },
  {
    id: "tba-3",
    name: "Minister TBA",
    role: "Gospel Artist",
    image: "/ministers/placeholder.svg",
    bio: "Expect high praise, deep worship, and Spirit-led encounters throughout the day.",
  },
  {
    id: "tba-4",
    name: "Minister TBA",
    role: "Host Pastor",
    image: "/ministers/placeholder.svg",
    bio: "Convening churches and believers from across nations for a landmark day of worship in Lagos.",
  },
  {
    id: "tba-5",
    name: "Minister TBA",
    role: "Choir Director",
    image: "/ministers/placeholder.svg",
    bio: "Mass choir and ensemble worship featuring voices from partnering congregations.",
  },
  {
    id: "tba-6",
    name: "Minister TBA",
    role: "Word Minister",
    image: "/ministers/placeholder.svg",
    bio: "Teaching and altar ministry timed with the evening session. Details forthcoming.",
  },
];
