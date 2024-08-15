import { UniqualizationSettingsForm } from "../types";

export const applyReflection = async (
  image: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<string> => {
  if (settings.reflection === "none") {
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

  ctx.save();

  if (settings.reflection === "horizontal") {
    ctx.scale(-1, 1);
    ctx.drawImage(image, -width, 0, width, height);
  } else if (settings.reflection === "vertical") {
    ctx.scale(1, -1);
    ctx.drawImage(image, 0, -height, width, height);
  } else if (settings.reflection === "both") {
    ctx.scale(-1, -1);
    ctx.drawImage(image, -width, -height, width, height);
  }

  ctx.restore();

  return canvas.toDataURL();
};