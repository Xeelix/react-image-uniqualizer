import React from "react";
import EmptyImagePlaceholder from "../EmptyImagePlaceholder/EmptyImagePlaceholder";

interface ImagePairDisplayProps {
  original: string | null;
  processed: string | null;
  onClick?: () => void;
}

const ImagePairDisplay: React.FC<ImagePairDisplayProps> = ({
  original,
  processed,
  onClick,
}) => {
  const renderColumn = (title: string, src: string | null) => (
    <div className='w-1/2 px-2'>
      <h2 className='text-xl font-medium mb-2 text-center'>{title}</h2>
      <div className='w-full h-[300px] border shadow-sm border-gray-300 rounded-lg overflow-hidden'>
        {src ? (
          <img
            src={src}
            alt={title}
            className='w-full h-full object-contain'
          />
        ) : (
          <EmptyImagePlaceholder />
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`flex justify-between mb-4 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {renderColumn("Оригинал", original)}
      {renderColumn("Уникализированное", processed)}
    </div>
  );
};

export default ImagePairDisplay;