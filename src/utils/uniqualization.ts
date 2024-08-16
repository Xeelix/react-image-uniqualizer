import { ImagePairInterface, UniqualizationSettingsForm } from "../types";
import { generateImageName, generateNamesList } from "./naming";
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

      const response = await fetch(image.processed);
      const blob = await response.blob();

      if (settings.folderSrtucture === "oneFolder") {
        zip.file(newName, blob);
      } else if (settings.folderSrtucture === "subfolders") {
        zip.folder(`copy_${i + 1}`)?.file(newName, blob);
      } else if (settings.folderSrtucture === "eachFolder") {
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