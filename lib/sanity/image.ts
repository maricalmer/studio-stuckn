import { createImageUrlBuilder } from "@sanity/image-url";

import type { ImageViewModel } from "@/lib/content/types";
import { getPublicEnvironment } from "./env";

const candidateWidths = [320, 480, 640, 768, 1024, 1280, 1440, 1920, 2560, 3200];
const sanityCdnOrigin = "https://cdn.sanity.io";

type SanityImageSource = {
  asset: { _ref: string };
  crop?: ImageViewModel["crop"];
  hotspot?: ImageViewModel["hotspot"];
};

export interface ImageCandidate {
  width: number;
  height: number;
  url: string;
}

function clampCrop(value: number | undefined) {
  return Math.min(Math.max(value ?? 0, 0), 1);
}

function visibleAspectRatio(image: ImageViewModel) {
  const crop = image.crop;
  const visibleWidth = Math.max(
    0.01,
    1 - clampCrop(crop?.left) - clampCrop(crop?.right),
  );
  const visibleHeight = Math.max(
    0.01,
    1 - clampCrop(crop?.top) - clampCrop(crop?.bottom),
  );
  return (image.width * visibleWidth) / (image.height * visibleHeight);
}

function dimensionsForWidth(image: ImageViewModel, width: number) {
  const aspectRatio = visibleAspectRatio(image);
  const maxWidth = Math.min(image.width, Math.floor(image.height * aspectRatio));
  const outputWidth = Math.max(1, Math.min(width, maxWidth));
  return {
    width: outputWidth,
    height: Math.max(1, Math.round(outputWidth / aspectRatio)),
  };
}

function sourceFor(image: ImageViewModel): SanityImageSource | undefined {
  if (image.source !== "sanity" || !image.assetId) return undefined;
  return {
    asset: { _ref: image.assetId },
    crop: image.crop,
    hotspot: image.hotspot,
  };
}

function builderFor() {
  const { projectId, dataset } = getPublicEnvironment();
  return createImageUrlBuilder({
    baseUrl: sanityCdnOrigin,
    projectId,
    dataset,
  });
}

export function getImageCandidates(image: ImageViewModel): ImageCandidate[] {
  const source = sourceFor(image);
  if (!source) return [];

  const maxWidth = dimensionsForWidth(image, image.width).width;
  const widths = [...candidateWidths, maxWidth]
    .filter((width) => width > 0 && width <= maxWidth)
    .sort((a, b) => a - b)
    .filter((width, index, values) => values[index - 1] !== width);
  const builder = builderFor();

  return widths.map((width) => {
    const dimensions = dimensionsForWidth(image, width);
    const url = builder
      .image(source)
      .width(dimensions.width)
      .height(dimensions.height)
      .fit("crop")
      .auto("format")
      .quality(80)
      .url();
    return { ...dimensions, url };
  });
}

export function getImageDisplayDimensions(image: ImageViewModel) {
  return dimensionsForWidth(image, image.width);
}

export function getImageSrc(
  image: ImageViewModel,
  candidates = getImageCandidates(image),
) {
  return (
    candidates.find((candidate) => candidate.width >= 768)?.url ??
    candidates.at(-1)?.url ??
    image.src
  );
}
