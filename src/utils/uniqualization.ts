import { ImagePairInterface, UniqualizationSettingsForm } from "../types";
import { generateFileName, generateNamesList } from "./fileNaming";
import { processImageBlob } from "./imageProcessing";
import JSZip from "jszip";

// Оптимизированная версия runWithConcurrencyLimit
const runWithConcurrencyLimit = async <T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> => {
  const results: T[] = [];
  const executing: Promise<void>[] = [];
  const pool = new Set();

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

export async function uniqualizeImages(
  images: ImagePairInterface[],
  settings: UniqualizationSettingsForm,
  setIsProcessing: (isProcessing: boolean) => void,
  setProcessingProgress: (progress: { current: number; total: number }) => void
): Promise<Blob> {
  setIsProcessing(true);

  try {
    // Предварительно загружаем все изображения один раз
    const preloadedImages = await Promise.all(
      images.map(image => loadImage(image.original))
    );

    // Создаем ImageBitmap из загруженных изображений
    const imageBitmaps = await Promise.all(
      preloadedImages.map(img => createImageBitmap(img))
    );

    const zip = new JSZip();
    const processedNames: string[] = [];
    const timeStart = performance.now();

    let processedCount = 0;
    const totalCount = images.length * settings.copies;

    // Оптимизированное создание задач
    const tasks = Array.from({ length: settings.copies }, (_, i) =>
      images.map((image, j) => async () => {
        const newName = generateFileName(image.name, i * images.length + j, settings);
        processedNames.push(newName);

        const blob = await processImageBlob(preloadedImages[j], settings);

        if (settings.folderStructure === "oneFolder") {
          zip.file(newName, blob);
        } else if (settings.folderStructure === "subfolders") {
          zip.folder(`${i + 1}`)?.file(newName, blob);
        } else if (settings.folderStructure === "eachFolder") {
          zip.folder(`image_${j + 1}`)?.file(newName, blob);
        }

        processedCount++;
        setProcessingProgress({
          current: processedCount,
          total: totalCount,
        });
      })
    ).flat();

    // Используем оптимальное количество параллельных задач
    const concurrencyLimit = 10;

    console.log("concurrencyLimit", concurrencyLimit);
    
    await runWithConcurrencyLimit(tasks, concurrencyLimit);

    console.log(`Time taken: ${performance.now() - timeStart}ms`);

    if (settings.saveNamesList) {
      zip.file("names_list.txt", generateNamesList(processedNames));
    }

    const content = await zip.generateAsync({ 
      type: "blob",
      compression: "STORE" // Используем STORE вместо DEFLATE для скорости
    });
    
    setIsProcessing(false);
    return content;
  } catch (error) {
    setIsProcessing(false);
    throw error;
  }
}
