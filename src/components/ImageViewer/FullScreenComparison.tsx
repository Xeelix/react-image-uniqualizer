import React, { useCallback, useEffect } from 'react';
import ImageThumbnail from './ImageThumbnail';
import { ImagePairInterface } from '../../types';

interface FullScreenComparisonProps {
  images: ImagePairInterface[];
  currentIndex: number;
  onClose: () => void;
  onSelectImage: (index: number) => void;
}

const FullScreenComparison: React.FC<FullScreenComparisonProps> = ({
  images,
  currentIndex,
  onClose,
  onSelectImage,
}) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    } else if (event.key === 'ArrowLeft') {
      onSelectImage((currentIndex - 1 + images.length) % images.length);
    } else if (event.key === 'ArrowRight') {
      onSelectImage((currentIndex + 1) % images.length);
    }
  }, [onClose, onSelectImage, currentIndex, images.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const currentImage = images[currentIndex];

  return (
    <div
      className='fixed p-4 inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50'
      onClick={onClose}
    >
      <div className='relative w-full h-[calc(100%-100px)] flex gap-6' onClick={(e) => e.stopPropagation()}>
        <div className='w-1/2 h-full'>
          <img src={currentImage.original} alt="Original" className='w-full h-full object-contain' />
        </div>
        <div className='w-1/2 h-full'>
          <img src={currentImage.processed} alt="Processed" className='w-full h-full object-contain' />
        </div>
        <button
          className='absolute top-4 right-4 text-white text-2xl'
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className='flex overflow-x-auto py-2 h-[100px]' onClick={(e) => e.stopPropagation()}>
        {images.map((image, index) => (
          <ImageThumbnail
            key={index}
            src={image.original}
            isSelected={index === currentIndex}
            onClick={() => onSelectImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FullScreenComparison;