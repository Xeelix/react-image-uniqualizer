import { ImagePairInterface, UniqualizationSettingsForm } from "../types";
import { applyRotation } from "./applyRotation";
import { applyCrop } from "./applyCrop";
import { applySaturation } from "./applySaturation";
import { applyBrightness } from "./applyBrightness";
import { applyContrast } from "./applyContrast";
import { applyReflection } from "./applyReflection";
import { applyNoise } from "./applyNoise";

export const processImage = async (
  img: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<string> => {
  let processedImage = img.src;

  processedImage = await applyRotation(img, settings);
  processedImage = await applyCrop(await loadImage(processedImage), settings);
  processedImage = await applySaturation(
    await loadImage(processedImage),
    settings
  );
  processedImage = await applyBrightness(
    await loadImage(processedImage),
    settings
  );
  processedImage = await applyContrast(
    await loadImage(processedImage),
    settings
  );
  processedImage = await applyReflection(
    await loadImage(processedImage),
    settings
  );
  processedImage = await applyNoise(await loadImage(processedImage), settings);

  return processedImage;
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
};

export const processImages = async (
  images: ImagePairInterface[],
  settings: UniqualizationSettingsForm
): Promise<ImagePairInterface[]> => {
  const processedImages = [];

  for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = images[i].original;
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    const processedImage = await processImage(img, settings);
    processedImages.push({
      original: images[i].original,
      processed: processedImage,
      name: images[i].name,
    });
  }

  return processedImages;
};
