import { UniqualizationSettingsForm } from "../types";

export const applyCrop = async (
  image: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<string> => {
  if (!settings.crop.enabled) {
    return image.src;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  const width = image.width;
  const height = image.height;

  const cropAmount = Math.floor(
    Math.random() * (settings.crop.max - settings.crop.min + 1) +
      settings.crop.min
  );
  let cropX = 0;
  let cropY = 0;
  let cropWidth = width;
  let cropHeight = height;

  switch (settings.crop.side) {
    case "top":
      cropY = cropAmount;
      cropHeight -= cropAmount;
      break;
    case "bottom":
      cropHeight -= cropAmount;
      break;
    case "left":
      cropX = cropAmount;
      cropWidth -= cropAmount;
      break;
    case "right":
      cropWidth -= cropAmount;
      break;
    case "random": {
      const sides = ["top", "bottom", "left", "right"];
      const randomSide = sides[Math.floor(Math.random() * sides.length)];
      return applyCrop(image, {
        ...settings,
        crop: { ...settings.crop, side: randomSide as any },
      });
    }
  }

  canvas.width = cropWidth;
  canvas.height = cropHeight;

  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  return canvas.toDataURL();
};
