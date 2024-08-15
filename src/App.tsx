import { useState } from "react";
import ImageUploader from "./components/shared/image-uploader";
import ImageViewer from "./components/shared/image-viewer";
import { Container } from "./components/shared/container";
import { ProcessedImage } from "./types";

function App() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageUpload = (files: File[]) => {
    const validFiles = files.slice(0, 10);
    const newImages = validFiles.map((file) => ({
      original: URL.createObjectURL(file),
      processed: URL.createObjectURL(file), // In reality, this would be the processed image
    }));
    setImages(newImages);
  };

  const handleSelectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <main className='bg-background min-h-screen'>
      <Container className='py-8'>
        <h1 className='text-xl font-medium mb-6 text-[#016999]'>
          Уникализация картинок
        </h1>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <ImageUploader onUpload={handleImageUpload} />
        </div>

        <div>
            <ImageViewer
              images={images}
              currentIndex={currentIndex}
              onSelectImage={handleSelectImage}
            />
        </div>
      </Container>
    </main>
  );
}

export default App;
