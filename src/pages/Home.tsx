import ImageUploader from "../components/ImageUploader/ImageUploader";
import ImageViewer from "../components/ImageViewer/ImageViewer";
import { Container } from "../components/Container/Container";
import { useImageStore } from "../store/ImageStore";

function Home() {
const { images, currentIndex, setImages, setCurrentIndex } = useImageStore();

  const handleImageUpload = (files: File[]) => {
    const validFiles = files.slice(0, 10);
    const newImages = validFiles.map((file) => ({
      original: URL.createObjectURL(file),
      processed: URL.createObjectURL(file),
    }));
    setImages(newImages);
  };

  const handleSelectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className='bg-background min-h-screen'>
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
    </div>
  );
}

export default Home;