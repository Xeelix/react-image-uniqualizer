import { UniqualizationSettingsForm } from "../types";

export const applySaturation = async (
  image: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<string> => {
  if (!settings.saturation.enabled) {
    return image.src;
  }

  const saturationAmount = Math.random() * (settings.saturation.max - settings.saturation.min) + settings.saturation.min;

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
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const avg = (r + g + b) / 3;
    data[i] = avg + (r - avg) * (saturationAmount / 100);
    data[i + 1] = avg + (g - avg) * (saturationAmount / 100);
    data[i + 2] = avg + (b - avg) * (saturationAmount / 100);
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
};