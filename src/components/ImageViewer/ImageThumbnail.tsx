import React from "react";
import clsx from "clsx";

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
  return (
    <div
      className={clsx(
        "w-20 h-20 flex-shrink-0 mr-2 cursor-pointer border-2",
        isSelected ? "border-blue-500" : "border-transparent"
      )}
      onClick={onClick}
    >
      <img src={src} alt='Thumbnail' className='w-full h-full object-cover' />
    </div>
  );
};

export default ImageThumbnail;
