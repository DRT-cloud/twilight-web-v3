// Astro 5 content collections — uses the glob loader (replaces the legacy
// type: "content" API from Astro 4).
//
// Note: the file must live at src/content.config.ts (NOT src/content/config.ts)
// for Astro 5 to pick it up.

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    season: z.enum(["spring", "fall"]),
    status: z.enum(["upcoming", "registration-open", "closed", "past"]),

    // Operational
    checkinWindow: z.string(),
    shootersMeeting: z.string(),
    firstRelease: z.string(),
    gatesOpen: z.string().optional(),

    // Registration
    registrationOpens: z.coerce.date(),
    registrationCloses: z.coerce.date(),
    registrationUrl: z.string().url().optional(),

    // Pricing
    entryFee: z.number().default(100),
    secondDivisionFee: z.number().default(50),

    // Divisions
    fridayDivisions: z.array(z.string()),
    saturdayDivisions: z.array(z.string()),

    // Flags
    featured: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    category: z.enum([
      "general",
      "registration",
      "gear",
      "logistics",
      "scoring",
      "safety",
    ]),
    order: z.number().default(0),
  }),
});

const results = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/results" }),
  schema: z.object({
    eventTitle: z.string(),
    eventDate: z.coerce.date(),
    season: z.enum(["spring", "fall"]),
    year: z.number(),
    division: z.string(),
    lighting: z.enum(["NV", "WL", "Mixed", "Unknown"]).default("Unknown"),
    competitors: z.number().optional(),
    winner: z.string().optional(),
    winnerTime: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

export const collections = { events, faq, results };
