import { ImagePairInterface, UniqualizationSettingsForm } from "../types";
import { applyRotation } from "./applyRotation";
import { applyCrop } from "./applyCrop";
import { applySaturation } from "./applySaturation";
import { applyBrightness } from "./applyBrightness";
import { applyContrast } from "./applyContrast";
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
  let processedImage = img;

  const processingFunctions = [
    applyRotation,
    applyCrop,
    applySaturation,
    applyBrightness,
    applyContrast,
    applyReflection,
    applyNoise,
  ];

  for (const func of processingFunctions) {
    const processedSrc = await func(processedImage, settings);
    processedImage = await createImageFromSrc(processedSrc);
  }

  return processedImage.src;
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