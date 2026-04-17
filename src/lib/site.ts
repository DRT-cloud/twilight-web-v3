// Site-wide constants. Single source of truth for metadata.

export const SITE = {
  name: "Twilight Biathlon",
  tagline: "Run the Dark. Shoot the Dark.",
  description:
    "The original nighttime run-and-gun biathlon. 5K night course, 4 live-fire shooting stages, NV and white-light divisions. Pawnee, Oklahoma — running since 2018.",
  url: "https://twilightbiathlon.com",
  locale: "en-US",
  ogImage: "/images/og-default.jpg",

  venue: {
    name: "The Burial Mound Shooting Center",
    address: "42251 S 34500 Rd",
    city: "Pawnee",
    state: "Oklahoma",
    region: "OK",
    postalCode: "74058",
    country: "US",
    website: "https://theburialmound.com/",
  },

  contact: {
    email: "okmultigun@gmail.com",
  },

  // Nav items surface in the header in this order
  nav: [
    { href: "/about", label: "About" },
    { href: "/register", label: "Register" },
    { href: "/rules", label: "Rules" },
    { href: "/results", label: "Results" },
    { href: "/location", label: "Location" },
    { href: "/faq", label: "FAQ" },
    { href: "/what-is-run-and-gun", label: "What is Run-and-Gun?" },
    { href: "/first-timer", label: "First-Timer Guide" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ],

  footerNav: [],
} as const;

export type NavItem = { href: string; label: string };
