import { ImagePairInterface, UniqualizationSettingsForm } from "../types";
import { generateImageName, generateNamesList } from "./naming";
import { processImage } from "./imageProcessing";
import JSZip from "jszip";

export async function uniqualizeImages(
  images: ImagePairInterface[],
  settings: UniqualizationSettingsForm,
  setIsProcessing: (isProcessing: boolean) => void
): Promise<Blob> {
  setIsProcessing(true);

  const zip = new JSZip();
  const processedNames: string[] = [];

  for (let i = 0; i < settings.copies; i++) {
    for (let j = 0; j < images.length; j++) {
      const image = images[j];
      const newName = generateImageName(image.name, i * images.length + j, settings);
      processedNames.push(newName);

      // Process the image
      const img = new Image();
      img.src = image.original;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      const processedImageSrc = await processImage(img, settings);

      // Convert the processed image to a Blob
      const response = await fetch(processedImageSrc);
      const blob = await response.blob();

      if (settings.folderStructure === "oneFolder") {
        zip.file(newName, blob);
      } else if (settings.folderStructure === "subfolders") {
        zip.folder(`${i + 1}`)?.file(newName, blob);
      } else if (settings.folderStructure === "eachFolder") {
        zip.folder(`image_${j + 1}`)?.file(newName, blob);
      }
    }
  }

  if (settings.saveNamesList) {
    const namesList = generateNamesList(processedNames);
    zip.file("names_list.txt", namesList);
  }

  const content = await zip.generateAsync({ type: "blob" });
  setIsProcessing(false);
  return content;
}