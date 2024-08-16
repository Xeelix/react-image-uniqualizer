import { UniqualizationSettingsForm } from "../types";

export const applyContrast = async (
  image: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<string> => {
  if (!settings.contrast.enabled) {
    return image.src;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const contrastAmount =
    Math.random() * (settings.contrast.max - settings.contrast.min) +
    settings.contrast.min;

  adjustContrast(imageData, contrastAmount);

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
};

function adjustContrast(imageData: ImageData, contrast: number): void {
  const data = imageData.data;
  contrast = contrast - 100;
  const factor = (255 + contrast) / (255.01 - contrast);

  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(factor * (data[i] - 128) + 128);
    data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128);
    data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128);
  }
}

function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}
