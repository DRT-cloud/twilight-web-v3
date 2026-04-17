# Twilight Biathlon

The original nighttime run-and-gun biathlon. Pawnee, Oklahoma. Running since 2018.

Website source — Astro + Tailwind CSS v4, deployed to Cloudflare Pages.

---

## Quick start

Requires Node 20+ and npm.

```bash
npm install
npm run dev          # dev server on http://localhost:4321
npm run build        # production build to dist/
npm run preview      # preview production build locally
```

## Project structure

```
twilight-biathlon/
├── astro.config.mjs         # Astro + sitemap + Tailwind v4 (via Vite)
├── package.json
├── tsconfig.json
├── public/                  # served as-is, no processing
│   ├── fonts/               # self-hosted WOFF2 (see README inside)
│   ├── images/              # hero + OG image (see README inside)
│   ├── _headers             # Cloudflare Pages cache + security headers
│   ├── _redirects           # path-level redirects (empty for now)
│   ├── robots.txt
│   ├── favicon.svg
│   └── site.webmanifest
└── src/
    ├── components/          # reusable .astro components
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── Hero.astro
    │   ├── StatsStrip.astro
    │   ├── EventCard.astro
    │   ├── HowItWorks.astro
    │   ├── Differentiators.astro
    │   ├── Countdown.astro
    │   ├── QuickLinks.astro
    │   └── UpdatesSignup.astro
    ├── content/
    │   ├── config.ts        # typed frontmatter schemas
    │   ├── events/          # spring-2026.md, fall-2026.md
    │   ├── faq/             # one .md per question
    │   └── results/         # add one .md per event
    ├── layouts/
    │   └── BaseLayout.astro # HTML shell, meta, preload
    ├── lib/
    │   ├── site.ts          # nav, contact, site constants
    │   └── format.ts        # date/currency helpers
    ├── pages/               # one file per URL
    │   ├── index.astro      # homepage
    │   ├── about.astro
    │   ├── register.astro
    │   ├── course.astro
    │   ├── rules.astro
    │   ├── schedule.astro
    │   ├── results.astro
    │   ├── faq.astro
    │   ├── gallery.astro
    │   ├── contact.astro
    │   └── 404.astro
    └── styles/
        └── global.css       # Tailwind v4 + design tokens
```

## How to edit content

All event data lives in Markdown files under `src/content/`.

### Add a new event

Create `src/content/events/spring-2027.md` with the same frontmatter as `spring-2026.md`. Rebuild — it shows up on the homepage and `/register` automatically.

### Add an FAQ

Create `src/content/faq/your-question.md`:

```markdown
---
question: "Your question text"
category: "general"  # or registration | gear | logistics | scoring | safety
order: 5             # display order, lowest first
---

Answer in Markdown. Supports **bold**, *italic*, lists, links.
```

### Change nav, contact email, venue

Edit `src/lib/site.ts`.

## Design system

- **Colors:** defined as CSS custom properties in `src/styles/global.css` under `@theme`. Use via `var(--color-*)` or Tailwind arbitrary values like `bg-[var(--color-nv)]`.
- **Fonts:** Barlow Condensed (display), Inter (body), JetBrains Mono (accent). Self-hosted WOFF2 — place files in `public/fonts/` per that folder's README.
- **Components:** Raw Tailwind. Interactive behavior uses small vanilla JS islands (<1 KB each).

## Deployment — Cloudflare Pages

1. Push this repo to GitHub (private repo recommended).
2. Cloudflare Pages dashboard → **Create project** → **Connect to Git** → select the repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `20` (set in env var `NODE_VERSION`)
4. Deploy. First deploy is on `<project>.pages.dev`.
5. Add custom domains `twilightbiathlon.com` and `www.twilightbiathlon.com` in **Custom domains** tab.
6. Cloudflare provides the target hostname; update Namecheap DNS:
   - **A record** `@` → Cloudflare-provided IP
   - **CNAME** `www` → `<project>.pages.dev` (or the provided target)
   - Delete old Namecheap URL Redirect record
   - Keep the `google-site-verification` TXT record
7. In Cloudflare Pages custom-domain settings for `www`, enable the redirect to apex.

Every `git push` to `main` triggers an automatic build + deploy. Branch pushes get preview URLs.

## Performance targets

Per `twilight-redesign-plan.md`:

- LCP ≤ 1.8 s (mobile 4G)
- INP ≤ 200 ms
- CLS ≤ 0.1
- Homepage JS payload < 20 KB
- Total CSS < 10 KB

Verify with [PageSpeed Insights](https://pagespeed.web.dev) against the Cloudflare preview URL before DNS cutover.

## License

Content © Twilight Biathlon. All rights reserved.
