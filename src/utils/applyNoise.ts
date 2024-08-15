import { UniqualizationSettingsForm } from "../types";

export const applyNoise = async (
  image: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<string> => {
  if (!settings.noise.enabled) {
    return image.src;
  }

  const noiseRange = settings.noise.max;

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
  const numChannels = 4; // Assuming RGBA

  const noise = new Float32Array(width * height * numChannels);
  for (let i = 0; i < noise.length; i += numChannels) {
    const noiseValue = (Math.random() - 0.5) * noiseRange * 255;
    noise[i] = noiseValue;
    noise[i + 1] = noiseValue;
    noise[i + 2] = noiseValue;
  }

  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(data[i] + noise[i]);
    data[i + 1] = clamp(data[i + 1] + noise[i + 1]);
    data[i + 2] = clamp(data[i + 2] + noise[i + 2]);
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
};

function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}