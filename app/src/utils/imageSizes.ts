export const imageSizes = ["8x8", "16x16", "32x32", "64x64"] as const;

export type ImageSize = (typeof imageSizes)[number];

type Size = { width: number; height: number };

export const imageSizeMapping: Record<ImageSize, Size> = {
  "8x8": { height: 8, width: 8 },
  "16x16": { height: 16, width: 16 },
  "32x32": { height: 32, width: 32 },
  "64x64": { height: 64, width: 64 },
};
