export {};

declare const self: DedicatedWorkerGlobalScope;

import { applyRotation } from "../utils/applyRotation";
import { applyCrop } from "../utils/applyCrop";
import { applyFilters } from "../utils/applyFilters";
import { applyReflection } from "../utils/applyReflection";
import { applyNoise } from "../utils/applyNoise";

// Define a minimal settings interface (expand as needed)
interface UniqualizationSettingsForm {
  reflection: "none" | "horizontal" | "vertical" | "both";
  rotation?: { enabled: boolean; min: number; max: number };
  noise?: { enabled: boolean; max: number }; // interpreted here as a number of affected pixels
  crop?: { enabled: boolean; min: number; max: number; side: "random" | "top" | "bottom" | "left" | "right" };
  brightness?: { enabled: boolean; min: number; max: number };
  contrast?: { enabled: boolean; min: number; max: number };
  saturation?: { enabled: boolean; min: number; max: number };
  [key: string]: any;
}

self.onmessage = async (event: MessageEvent) => {
  try {
    const { imageBitmap, settings } = event.data as {
      imageBitmap: ImageBitmap;
      settings: UniqualizationSettingsForm;
    };

    // Создаем один canvas для всех операций
    const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
    const ctx = canvas.getContext('2d', { alpha: false }) as OffscreenCanvasRenderingContext2D;
    
    // Начальная отрисовка изображения
    ctx.drawImage(imageBitmap, 0, 0);

    // Apply reflection if needed
    if (settings.reflection && settings.reflection !== "none") {
      applyReflection(ctx, canvas, settings.reflection);
    }

    // Apply CSS filters (brightness, contrast, and saturation)
    if (
      (settings.brightness?.enabled) ||
      (settings.contrast?.enabled) ||
      (settings.saturation?.enabled)
    ) {
      applyFilters(ctx, canvas, {
        brightness: settings.brightness,
        contrast: settings.contrast,
        saturation: settings.saturation
      });
    }

    // === Rotation effect ===
    if (settings.rotation?.enabled) {
      const angle = settings.rotation.min + 
        Math.random() * (settings.rotation.max - settings.rotation.min);
      applyRotation(ctx, canvas, angle);
    }

    // === Noise Effect ===
    if (settings.noise?.enabled && settings.noise.max > 0) {
      applyNoise(ctx, canvas, settings.noise.max);
    }

    // === Crop Effect ===
    if (settings.crop?.enabled) {
      const cropAmount = settings.crop.min + 
        Math.floor(Math.random() * (settings.crop.max - settings.crop.min));
      
      applyCrop(ctx, canvas, cropAmount, settings.crop.side);
    }

    // Конвертируем в blob с оптимальным качеством
    const blob = await canvas.convertToBlob({ 
      type: 'image/png',
      quality: 0.9 
    });
    
    // Создаем новый Blob для передачи
    const transferableBlob = new Blob([await blob.arrayBuffer()], { type: blob.type });
    
    // Отправляем сообщение с blob
    self.postMessage({ blob: transferableBlob }, []);
  } catch (error: any) {
    self.postMessage({ error: error.message });
  }
}; 