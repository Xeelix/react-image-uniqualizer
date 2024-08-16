import ImageUploader from "../components/ImageUploader/ImageUploader";
import ImageViewer from "../components/ImageViewer/ImageViewer";
import { Container } from "../components/Container/Container";
import { useImageStore } from "../store/ImageStore";
import UniqualizationSettings from "../components/UniqualizationSettings/UniqualizationSettings";
import { processImages } from "../utils/imageProcessing";
import { useRef, useState } from "react";
import JSZip from "jszip";
import { CustomLoader } from "../components/CustomLoader";

function Home() {
  const { setImages, images, settings } = useImageStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (files: File[]) => {
    const validFiles = files.slice(0, 10);
    const newImages = validFiles.map((file) => ({
      original: URL.createObjectURL(file),
      processed: URL.createObjectURL(file),
    }));

    // Process the new images
    const processedImages = await processImages(newImages, settings);

    // Update the state with the processed images
    setImages(processedImages);
  };

  const handleUniqualization = async () => {
    if (images.length === 0 || isProcessing) return;

    const zip = new JSZip();
    const processedImages: { copy: number; index: number; blob: Blob }[] = [];
    console.log("Settings: ", settings);

    setIsProcessing(true);
    for (let copy = 1; copy <= settings.copies; copy++) {
      // Create a new copy of the images for each iteration
      const imageCopy = images.map((img) => ({
        original: img.original,
        processed: img.original, // Reset processed to original for each copy
      }));

      const processedCopy = await processImages(imageCopy, settings);

      const promises = processedCopy.map(async (image, index) => {
        const response = await fetch(image.processed);
        const blob = await response.blob();

        processedImages.push({ copy, index, blob });
      });

      await Promise.all(promises);
    }

    // Add processed images to the zip file
    processedImages.forEach(({ copy, index, blob }) => {
      let fileName = `processed_image_${index + 1}.jpg`;

      switch (settings.folderSrtucture) {
        case "oneFolder":
          zip.file(`${fileName}_${copy}.jpg`, blob);
          break;
        case "subfolders":
          zip.file(`image_${index + 1}/copy_${copy}.jpg`, blob);
          break;
        case "eachFolder":
          zip.file(`copy_${copy}/image_${index + 1}.jpg`, blob);
          break;
      }
    });

    setIsProcessing(false);

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "processed_images.zip";
    link.click();
  };

  return (
    <div className='bg-background min-h-screen'>
      <Container className='py-8'>
        <h1 className='text-xl font-medium mb-6 text-[#016999]'>
          Уникализация картинок
        </h1>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <ImageUploader onUpload={handleImageUpload} />

          <UniqualizationSettings />
        </div>

        <div>
          <ImageViewer />
        </div>

        <div className='mt-6'>
          <button
            onClick={handleUniqualization}
            className={`py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center ${
              images.length === 0 || isProcessing
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark text-white"
            }`}
            disabled={images.length === 0 || isProcessing}
          >
            {isProcessing ? (
              <>
                <CustomLoader className='w-5 h-5 mr-2' />
                Обработка...
              </>
            ) : (
              "Уникализировать и скачать"
            )}
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Home;
