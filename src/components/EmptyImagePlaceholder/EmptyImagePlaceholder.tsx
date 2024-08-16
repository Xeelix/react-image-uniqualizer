import React from "react";
import thumbnail from "../../assets/thumbnail.jpeg";

const EmptyImagePlaceholder: React.FC = () => (
  <img
    src={thumbnail}
    alt='Empty placeholder'
    className='w-full h-full object-cover'
  />
);

export default EmptyImagePlaceholder;
