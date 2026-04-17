# /public/images/

Drop event photography here. At minimum you need a hero image for the homepage:

## Required for v1

- `hero.jpg` — 1920×1080 fallback
- `hero.webp` — 1920×1080 WebP
- `hero.avif` — 1920×1080 AVIF (highest quality, smallest file)
- `og-default.jpg` — 1200×630 for social previews

## Processing your hero

Recommended tool: [Squoosh CLI](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli)
or direct Sharp.

```bash
# Using Sharp (Node)
npx sharp-cli --input hero-original.jpg --output hero.avif --format avif --quality 60
npx sharp-cli --input hero-original.jpg --output hero.webp --format webp --quality 75
npx sharp-cli --input hero-original.jpg --output hero.jpg --format jpeg --quality 80
```

Target file sizes at 1920×1080:
- AVIF: ≤ 120 KB
- WebP: ≤ 180 KB
- JPEG: ≤ 250 KB

## For gallery images

Put originals in `src/assets/gallery/` instead (Astro's `<Image />` component
processes them at build time, generating AVIF + WebP + responsive srcset
automatically). `/public/images/` is only for assets that need a stable URL
(hero, OG image, favicons).
