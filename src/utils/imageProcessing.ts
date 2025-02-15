import { ImagePairInterface, UniqualizationSettingsForm } from "../types";
import { applyRotation } from "./applyRotation";
import { applyCrop } from "./applyCrop";
import { applyFilters } from "./applyFilters";
import { applyReflection } from "./applyReflection";
import { applyNoise } from "./applyNoise";

const createImageFromSrc = async (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
};

export const processImage = async (
  img: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<string> => {
  const canvas = new OffscreenCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  ctx.drawImage(img, 0, 0);

  // Apply each effect
  applyReflection(ctx, canvas, settings.reflection);

  if (settings.rotation.enabled) {
    const angle = settings.rotation.min + 
      Math.random() * (settings.rotation.max - settings.rotation.min);
    applyRotation(ctx, canvas, angle);
  }

  applyFilters(ctx, canvas, settings);

  if (settings.noise.enabled) {
    applyNoise(ctx, canvas, settings.noise.max);
  }

  if (settings.crop.enabled) {
    const cropAmount = settings.crop.min + 
      Math.floor(Math.random() * (settings.crop.max - settings.crop.min));
    applyCrop(ctx, canvas, cropAmount, settings.crop.side);
  }

  const blob = await canvas.convertToBlob({ type: "image/png" });
  return URL.createObjectURL(blob);
};

export const processImages = async (
  images: ImagePairInterface[],
  settings: UniqualizationSettingsForm
): Promise<ImagePairInterface[]> => {
  const processImagePromises = images.map(async (image) => {
    const img = await createImageFromSrc(image.original);
    const processedImage = await processImage(img, settings);
    return {
      original: image.original,
      processed: processedImage,
      name: image.name,
    };
  });

  return Promise.all(processImagePromises);
};