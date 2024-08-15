import { UniqualizationSettingsForm } from '../types';

export const applyRotation = async (image: HTMLImageElement, settings: UniqualizationSettingsForm): Promise<string> => {
  if (!settings.rotation.enabled) {
    return image.src;
  }

  const rotationAngle = Math.random() * (settings.rotation.max - settings.rotation.min) + settings.rotation.min;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;

  ctx.translate(width / 2, height / 2);
  ctx.rotate((rotationAngle * Math.PI) / 180);
  ctx.drawImage(image, -width / 2, -height / 2);

  return canvas.toDataURL();
};