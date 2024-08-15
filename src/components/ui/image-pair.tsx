import React from 'react';
import ImageColumn from './image-column';

interface ImagePairProps {
  original: string;
  processed: string;
  onClick: () => void;
}

const ImagePair: React.FC<ImagePairProps> = ({ original, processed, onClick }) => (
  <div className='flex justify-between mb-4 cursor-pointer' onClick={onClick}>
    <ImageColumn title="Оригинал" src={original} />
    <ImageColumn title="Обработанное" src={processed} />
  </div>
);

export default ImagePair;