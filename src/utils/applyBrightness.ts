import { UniqualizationSettingsForm } from "../types";

export const applyBrightness = async (
  image: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<string> => {
  if (!settings.brightness.enabled) {
    return image.src;
  }

  const brightnessAmount =
    Math.random() * (settings.brightness.max - settings.brightness.min) +
    settings.brightness.min;

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
    data[i] = data[i] * (brightnessAmount / 100);
    data[i + 1] = data[i + 1] * (brightnessAmount / 100);
    data[i + 2] = data[i + 2] * (brightnessAmount / 100);
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
};
