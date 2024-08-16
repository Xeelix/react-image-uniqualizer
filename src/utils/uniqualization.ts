import JSZip from "jszip";
import { ImagePairInterface, UniqualizationSettingsForm } from "../types";
import { processImages } from "./imageProcessing";

export const uniqualizeImages = async (
  images: ImagePairInterface[],
  settings: UniqualizationSettingsForm,
  setIsProcessing: (isProcessing: boolean) => void
): Promise<Blob> => {
  const zip = new JSZip();
  const processedImages: { copy: number; index: number; blob: Blob; name: string }[] = [];

  setIsProcessing(true);

  for (let copy = 1; copy <= settings.copies; copy++) {
    const imageCopy = images.map((img) => ({
      original: img.original,
      processed: img.original,
      name: img.name
    }));
    const processedCopy = await processImages(imageCopy, settings);

    const promises = processedCopy.map(async (image, index) => {
      const response = await fetch(image.processed);
      const blob = await response.blob();
      processedImages.push({ copy, index, blob, name: image.name });
    });

    await Promise.all(promises);
  }

  addImagesToZip(processedImages, zip, settings.folderSrtucture);

  setIsProcessing(false);

  return zip.generateAsync({ type: "blob" });
};

const addImagesToZip = (
  processedImages: { copy: number; index: number; blob: Blob; name: string }[],
  zip: JSZip,
  folderStructure: UniqualizationSettingsForm["folderSrtucture"]
) => {
  const copyCount = Math.max(...processedImages.map((img) => img.copy));
  console.log(processedImages);

  processedImages.forEach(({ copy, index, blob, name }) => {
    const fileName = `image_${index + 1}.jpg`;

    switch (folderStructure) {
      case "oneFolder":
        zip.file(`processed_image_${index + 1}_${copy}.jpg`, blob);
        break;
      case "subfolders":
        zip.file(`image_${index + 1}/${fileName}_copy_${copy}.jpg`, blob);
        break;
      case "eachFolder":
        for (let i = 1; i <= copyCount; i++) {
          if (i === copy) {
            zip.file(`copy_${i}/${fileName}`, blob);
          } else {
            const placeholderImage = processedImages.find(
              (img) => img.index === index && img.copy === i
            );
            if (placeholderImage) {
              zip.file(`copy_${i}/${fileName}`, placeholderImage.blob);
            }
          }
        }
        break;
    }
  });
};
