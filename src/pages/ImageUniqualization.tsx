import ImageUploader from "../components/ImageUploader/ImageUploader";
import ImageViewer from "../components/ImageViewer/ImageViewer";
import { Container } from "../components/Container/Container";
import { useImageStore } from "../store/ImageStore";
import UniqualizationSettings from "../components/UniqualizationSettings/UniqualizationSettings";
import { processImage } from "../utils/imageProcessing";
import { useState } from "react";
import { uniqualizeImages } from "../utils/uniqualization";
import CustomButton from "../components/CustomInputs/CustomButton";

function ImageUniqualization() {
  const { setImages, images, settings } = useImageStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (files: File[]) => {
    const validFiles = files.slice(0, 10);
    const newImages = validFiles.map((file) => ({
      original: URL.createObjectURL(file),
      processed: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages(newImages);

    // Process the first image immediately after upload
    if (newImages.length > 0) {
      const firstImage = newImages[0];

      const img = new Image();
      img.src = firstImage.original;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const processedImageSrc = await processImage(img, settings);
      const updatedImages = newImages.map((image, index) =>
        index === 0 ? { ...image, processed: processedImageSrc } : image
      );

      setImages(updatedImages);
    }
  };

  const handleUniqualization = async () => {
    if (images.length === 0 || isProcessing) return;

    try {
      const content = await uniqualizeImages(images, settings, setIsProcessing);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "processed_images.zip";
      link.click();
    } catch (error) {
      console.error("Error during uniqualization:", error);
      setIsProcessing(false);
    }
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

        <div className='mt-4 flex justify-end'>
          <CustomButton
            onClick={handleUniqualization}
            label='Уникализировать и скачать'
            variant='primary'
            disabled={images.length === 0 || isProcessing}
            isLoading={isProcessing}
            loadingText='Обработка...'
          />
        </div>
      </Container>
    </div>
  );
}

export default ImageUniqualization;
