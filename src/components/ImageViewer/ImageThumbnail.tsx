import React from "react";

interface ImageThumbnailProps {
  src: string;
  isSelected: boolean;
  onClick: () => void;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  src,
  isSelected,
  onClick,
}) => {
  const baseClasses = "w-20 h-20 flex-shrink-0 mr-2 cursor-pointer border-2";
  const borderClass = isSelected ? "border-blue-500" : "border-transparent";

  return (
    <div className={`${baseClasses} ${borderClass}`} onClick={onClick}>
      <img src={src} alt='Thumbnail' className='w-full h-full object-cover' />
    </div>
  );
};

export default ImageThumbnail;
