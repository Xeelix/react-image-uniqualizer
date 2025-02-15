export {};

declare const self: DedicatedWorkerGlobalScope;

import { applyRotation } from "../utils/applyRotation";
import { applyCrop } from "../utils/applyCrop";
import { applyFilters } from "../utils/applyFilters";
import { applyReflection } from "../utils/applyReflection";
import { applyNoise } from "../utils/applyNoise";

// Define a minimal settings interface (expand as needed)
interface UniqualizationSettingsForm {
  reflection?: { enabled: boolean };
  rotation?: { enabled: boolean; min: number; max: number };
  noise?: { enabled: boolean; max: number }; // interpreted here as a number of affected pixels
  crop?: { enabled: boolean; min: number; max: number; side: string };
  hueRotate?: { enabled: boolean; from: number; to: number };
  brightness?: { enabled: boolean; from: number; to: number };
  contrast?: { enabled: boolean; from: number; to: number };
  saturation?: { enabled: boolean; from: number; to: number };
  // other properties as needed…
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

    // === Reflection (mirror) effect ===
    if (settings.reflection?.enabled) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(canvas, -canvas.width, 0);
      ctx.restore();
    }

    // Собираем все CSS фильтры в один
    const filters: string[] = [];
    const filterOperations = [
      { enabled: settings.hueRotate?.enabled, type: 'hue-rotate', value: settings.hueRotate, unit: 'deg' },
      { enabled: settings.brightness?.enabled, type: 'brightness', value: settings.brightness, unit: '%' },
      { enabled: settings.contrast?.enabled, type: 'contrast', value: settings.contrast, unit: '%' },
      { enabled: settings.saturation?.enabled, type: 'saturate', value: settings.saturation, unit: '%' }
    ];

    filters.push(...filterOperations
      .filter(op => op.enabled)
      .map(op => {
        const val = op.value.from + Math.random() * (op.value.to - op.value.from);
        return `${op.type}(${val}${op.unit})`;
      }));

    // Применяем все фильтры за один проход
    if (filters.length > 0) {
      const tempCanvas = new OffscreenCanvas(canvas.width, canvas.height);
      const tempCtx = tempCanvas.getContext('2d', { alpha: false }) as OffscreenCanvasRenderingContext2D;
      tempCtx.filter = filters.join(' ');
      tempCtx.drawImage(canvas, 0, 0);
      ctx.drawImage(tempCanvas, 0, 0);
    }

    // === Rotation effect ===
    if (settings.rotation?.enabled) {
      const angle = settings.rotation.min + 
        Math.random() * (settings.rotation.max - settings.rotation.min);
      const angleRad = (angle * Math.PI) / 180;
      
      const tempCanvas = new OffscreenCanvas(canvas.width, canvas.height);
      const tempCtx = tempCanvas.getContext('2d', { alpha: false }) as OffscreenCanvasRenderingContext2D;
      
      tempCtx.translate(canvas.width / 2, canvas.height / 2);
      tempCtx.rotate(angleRad);
      tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    }

    // === Noise Effect ===
    if (settings.noise?.enabled && settings.noise.max > 0) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const pixelsToChange = Math.min(settings.noise.max, (canvas.width * canvas.height) / 10);
      
      // Используем Uint32Array для более быстрого доступа
      const pixels = new Uint32Array(data.buffer);
      
      for (let i = 0; i < pixelsToChange; i++) {
        const pixelIndex = Math.floor(Math.random() * pixels.length);
        // Создаем случайный цвет одной операцией
        pixels[pixelIndex] = 
          (255 << 24) |                    // alpha
          (Math.random() * 256 << 16) |    // red
          (Math.random() * 256 << 8) |     // green
          (Math.random() * 256);           // blue
      }
      
      ctx.putImageData(imageData, 0, 0);
    }

    // === Crop Effect ===
    if (settings.crop?.enabled) {
      const cropAmount = settings.crop.min + 
        Math.floor(Math.random() * (settings.crop.max - settings.crop.min));
      
      let sx = 0, sy = 0, sw = canvas.width, sh = canvas.height;
      
      switch (settings.crop.side) {
        case 't':
          sy = cropAmount;
          sh -= cropAmount;
          break;
        case 'b':
          sh -= cropAmount;
          break;
        case 'l':
          sx = cropAmount;
          sw -= cropAmount;
          break;
        case 'r':
          sw -= cropAmount;
          break;
        default:
          sx = cropAmount;
          sy = cropAmount;
          sw -= cropAmount * 2;
          sh -= cropAmount * 2;
      }

      const tempCanvas = new OffscreenCanvas(sw, sh);
      const tempCtx = tempCanvas.getContext('2d', { alpha: false }) as OffscreenCanvasRenderingContext2D;
      tempCtx.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);
      
      canvas.width = sw;
      canvas.height = sh;
      ctx.drawImage(tempCanvas, 0, 0);
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