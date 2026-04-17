// Auto-generated from /public/images/gallery at build time.
// Each photo lists the widths actually emitted by the sharp pipeline
// (sources smaller than the target width are skipped to avoid upscaling).

export type GalleryPhoto = {
  /** basename, e.g. "62033-21" */
  id: string;
  /** widths (in px) available as avif/webp/jpg variants */
  widths: number[];
  /** Human-readable caption — add by hand as needed */
  caption?: string;
  /** Which lighting style to accent the frame with (NV = green, WL = orange) */
  lighting?: "NV" | "WL";
};

// All 25 gallery photos. Hero (62033-21) lives under /images/hero/ separately.
export const photos: GalleryPhoto[] = [
  { id: "5678-20", widths: [640, 1024, 1600] },
  { id: "62020-24", widths: [640, 1024] },
  { id: "62021-5", widths: [640, 1024, 1600] },
  { id: "62022-7", widths: [640, 1024, 1600] },
  { id: "62023-15", widths: [640, 1024, 1600] },
  { id: "62024-4", widths: [640, 1024, 1600] },
  { id: "62025-18", widths: [640, 1024, 1600] },
  { id: "62026-19", widths: [640, 1024, 1600] },
  { id: "62027-12", widths: [640, 1024, 1600] },
  { id: "62028-9", widths: [640, 1024, 1600] },
  { id: "62029-3", widths: [640, 1024, 1600] },
  { id: "62030-6", widths: [640, 1024, 1600] },
  { id: "62031-22", widths: [640, 1024] },
  { id: "62032-23", widths: [640, 1024, 1600] },
  { id: "62034-8", widths: [640, 1024, 1600] },
  { id: "62035-14", widths: [640, 1024, 1600] },
  { id: "62036-16", widths: [640, 1024, 1600] },
  { id: "62037-2", widths: [640, 1024, 1600] },
  { id: "62038-10", widths: [640, 1024, 1600] },
  { id: "62040-11", widths: [640, 1024, 1600] },
  { id: "62041-13", widths: [640, 1024, 1600] },
  { id: "62042-25", widths: [640, 1024] },
  { id: "62043-17", widths: [640, 1024, 1600] },
  { id: "62044", widths: [640, 1024, 1600] },
  { id: "image", widths: [987] },
];

/** Build a srcset string for a given format */
export function srcset(
  id: string,
  widths: number[],
  format: "avif" | "webp" | "jpg",
  dir: "gallery" | "hero" = "gallery",
): string {
  return widths
    .map((w) => `/images/${dir}/${id}-${w}w.${format} ${w}w`)
    .join(", ");
}

/** Pick the canonical (largest available) JPEG fallback URL */
export function fallback(
  id: string,
  widths: number[],
  dir: "gallery" | "hero" = "gallery",
): string {
  const largest = Math.max(...widths);
  return `/images/${dir}/${id}-${largest}w.jpg`;
}
