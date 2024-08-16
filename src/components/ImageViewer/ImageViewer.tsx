import React, { useMemo, useState } from "react";
import ImageThumbnail from "./ImageThumbnail";
import ImagePair from "../ImagePair/ImagePair";
import EmptyImagePair from "../ImagePair/EmptyImagePair";
import FullScreenComparison from "./FullScreenComparison";
import { useImageStore } from "../../store/ImageStore";

const ImageViewer: React.FC = () => {
  const { images, currentIndex, setCurrentIndex } = useImageStore();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const currentImage = useMemo(
    () => images[currentIndex],
    [images, currentIndex]
  );

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const handleSelectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className='mt-8'>
      {images.length === 0 ? (
        <EmptyImagePair />
      ) : currentImage ? (
        <ImagePair
          original={currentImage.original}
          processed={currentImage.processed}
          onClick={toggleFullScreen}
        />
      ) : null}
      {!isFullScreen && (
        <div className='flex justify-center overflow-x-auto py-2'>
          {images.map((image, index) => (
            <ImageThumbnail
              key={index}
              src={image.original}
              isSelected={index === currentIndex}
              onClick={() => handleSelectImage(index)}
            />
          ))}
        </div>
      )}
      {isFullScreen && currentImage && (
        <FullScreenComparison
          images={images}
          currentIndex={currentIndex}
          onClose={toggleFullScreen}
          onSelectImage={handleSelectImage}
        />
      )}
    </div>
  );
};

export default ImageViewer;
