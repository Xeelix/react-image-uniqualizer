import { ImagePairInterface, UniqualizationSettingsForm } from "../types";
import { generateFileName, generateNamesList } from "./fileNaming";
import { processImageBlob } from "./imageProcessing";

// Оптимизированная версия runWithConcurrencyLimit
const runWithConcurrencyLimit = async <T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> => {
  const results: T[] = [];
  const executing: Promise<void>[] = [];
  const pool = new Set<Promise<void>>();

  for (const [index, task] of tasks.entries()) {
    const p = Promise.resolve().then(async () => {
      results[index] = await task();
      pool.delete(p);
    });
    pool.add(p);
    executing.push(p);
    if (pool.size >= limit) {
      await Promise.race(pool);
    }
  }
  await Promise.all(executing);
  return results;
};

// Вспомогательная функция для загрузки изображения
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

interface ZipItem {
  folder: string | null;
  fileName: string;
  blob: Blob;
}

export async function uniqualizeImages(
  images: ImagePairInterface[],
  settings: UniqualizationSettingsForm,
  setIsProcessing: (isProcessing: boolean) => void,
  setProcessingProgress: (progress: {
    current: number;
    total: number;
    message: string;
  }) => void
): Promise<Blob> {
  setIsProcessing(true);

  try {
    const preloadedImages = await Promise.all(
      images.map((image) => loadImage(image.original))
    );

    // Prepare arrays for processed file info and names list
    const zipItems: ZipItem[] = [];
    const processedNames: string[] = [];
    const timeStart = performance.now();

    let processedCount = 0;
    const totalCount = images.length * settings.copies;

    // Create tasks for each copy of every image
    const tasks: (() => Promise<void>)[] = Array.from(
      { length: settings.copies },
      (_, i) =>
        images.map((image, j) => async () => {
          const fileName = generateFileName(
            image.name,
            i * images.length + j,
            settings
          );
          processedNames.push(fileName);

          const blob = await processImageBlob(preloadedImages[j], settings);

          let folder: string | null = null;
          if (settings.folderStructure === "subfolders") {
            folder = String(i + 1);
          } else if (settings.folderStructure === "eachFolder") {
            folder = `image_${j + 1}`;
          }

          zipItems.push({ folder, fileName, blob });

          processedCount++;
          setProcessingProgress({
            current: processedCount,
            total: totalCount,
            message: "Обработка",
          });
        })
    ).flat();

    const concurrencyLimit = 10;
    await runWithConcurrencyLimit(tasks, concurrencyLimit);
    console.log(
      `Time taken for processing images: ${performance.now() - timeStart}ms`
    );

    let namesList: string | undefined;
    if (settings.saveNamesList) {
      namesList = generateNamesList(processedNames);
    }

    // Use a web worker to create the ZIP archive so the UI remains responsive.
    return new Promise<Blob>((resolve, reject) => {
      const worker = new Worker(
        new URL("../workers/zip.worker.ts", import.meta.url),
        { type: "module" }
      );

      worker.onmessage = (event: MessageEvent) => {
        const data = event.data;
        if (data.error) {
          setIsProcessing(false);
          reject(new Error(data.error));
          worker.terminate();
        } else if (data.blob) {
          setProcessingProgress({
            current: 100,
            total: 100,
            message: "Архивирование завершено",
          });
          setIsProcessing(false);
          resolve(data.blob);
          worker.terminate();
        } else if (data.progress) {
          setProcessingProgress({
            current: parseFloat(data.progress),
            total: 100,
            message: "Архивирование",
          });
        }
      };

      worker.onerror = (err) => {
        setIsProcessing(false);
        reject(err);
        worker.terminate();
      };

      // Start archival process (update UI to show archiving step)
      setProcessingProgress({
        current: 0,
        total: 100,
        message: "Архивирование",
      });
      worker.postMessage({
        files: zipItems,
        saveNames: settings.saveNamesList,
        namesList,
      });
    });
  } catch (error) {
    setIsProcessing(false);
    throw error;
  }
}
