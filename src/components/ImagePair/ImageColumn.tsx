import React from "react";

interface ImageColumnProps {
  title: string;
  src: string;
}

const ImageColumn: React.FC<ImageColumnProps> = ({ title, src }) => (
  <div className='w-1/2 px-2'>
    <h2 className='text-xl font-semibold mb-2 text-center'>{title}</h2>
    <img
      src={src}
      alt={title}
      className='w-full h-auto max-h-[300px] shadow-sm object-contain'
    />
  </div>
);

export default ImageColumn;
