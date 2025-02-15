import { ImagePairInterface, UniqualizationSettingsForm } from "../types";

const createImageFromSrc = async (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
};

// Offload processing to the worker via ImageBitmap transfer
const processImageWithWorker = async (
  imageBitmap: ImageBitmap,
  settings: UniqualizationSettingsForm
): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    try {
      const worker = new Worker(
        new URL('../workers/imageProcessing.worker.ts', import.meta.url),
        { 
          type: 'module',
          credentials: 'same-origin'
        }
      );

      worker.onmessage = (evt: MessageEvent) => {
        const { blob, error } = evt.data;
        if (error) {
          reject(new Error(error));
          worker.terminate();
          return;
        }
        
        // Проверяем, что blob существует и является Blob
        if (blob instanceof Blob) {
          resolve(blob);
        } else {
          reject(new Error('Invalid response from worker'));
        }
        worker.terminate();
      };

      worker.onerror = (err) => {
        console.error('Worker error:', err);
        reject(err);
        worker.terminate();
      };

      // Передаем данные в worker с корректным списком transferable objects
      worker.postMessage(
        { imageBitmap, settings }, 
        [imageBitmap]
      );
    } catch (error) {
      console.error('Error creating worker:', error);
      reject(error);
    }
  });
};

// This version is used for UI preview, returning a blob URL
export const processImage = async (
  img: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<string> => {
  const imageBitmap = await createImageBitmap(img);
  const blob = await processImageWithWorker(imageBitmap, settings);
  return URL.createObjectURL(blob);
};

// New helper to directly get the blob (avoids the extra fetch overhead)
export const processImageBlob = async (
  img: HTMLImageElement,
  settings: UniqualizationSettingsForm
): Promise<Blob> => {
  const imageBitmap = await createImageBitmap(img);
  return await processImageWithWorker(imageBitmap, settings);
};

export const processImages = async (
  images: ImagePairInterface[],
  settings: UniqualizationSettingsForm
): Promise<ImagePairInterface[]> => {
  const processImagePromises = images.map(async (image) => {
    const img = await createImageFromSrc(image.original);
    const processedImage = await processImage(img, settings);
    return {
      original: image.original,
      processed: processedImage,
      name: image.name,
    };
  });

  return Promise.all(processImagePromises);
};