import { UniqualizationSettingsForm } from "../types";

function generateHash(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function generateImageName(
  originalName: string,
  index: number,
  settings: UniqualizationSettingsForm
): string {
  let name = '';

  switch (settings.naming) {
    case 'hash':
      name = generateHash(15);
      break;
    case 'sequential':
      name = String(index + 1).padStart(5, '0');
      break;
    case 'original':
      name = originalName.split('.').slice(0, -1).join('.');
      break;
  }

  if (settings.prefix) {
    name = `${settings.prefix}${name}`;
  }

  if (settings.rightNumbering) {
    name = `${name}_${String(index + 1).padStart(5, '0')}`;
  }

  const extension = originalName.split('.').pop();
  return `${name}.${extension}`;
}

export function generateNamesList(images: string[]): string {
  return images.join('\n');
}