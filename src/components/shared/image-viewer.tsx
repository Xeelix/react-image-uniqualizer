import React, { useMemo, useState } from "react";
import ImageThumbnail from "./image-thumbnail";
import ImagePair from "../ui/image-pair";
import EmptyImagePair from "../ui/empty-image-pair";
import FullScreenComparison from "./full-screen-comparison";
import { Image } from "../../types/types";

interface ImageViewerProps {
  images: Image[];
  currentIndex: number;
  onSelectImage: (index: number) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  onSelectImage,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const currentImage = useMemo(() => images[currentIndex], [images, currentIndex]);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  return (
    <div className='mt-8'>
      {images.length === 0 ? (
        <EmptyImagePair />
      ) : (
        <ImagePair
          original={currentImage.original}
          processed={currentImage.processed}
          onClick={toggleFullScreen}
        />
      )}
      <div className='flex overflow-x-auto py-2'>
        {images.map((image, index) => (
          <ImageThumbnail
            key={index}
            src={image.original}
            isSelected={index === currentIndex}
            onClick={() => onSelectImage(index)}
          />
        ))}
      </div>
      {isFullScreen && (
        <FullScreenComparison
          images={images}
          currentIndex={currentIndex}
          onClose={toggleFullScreen}
          onSelectImage={onSelectImage}
        />
      )}
    </div>
  );
};

export default ImageViewer;