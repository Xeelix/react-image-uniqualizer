import React from 'react';

const EmptyImagePlaceholder: React.FC = () => (
  <img
    src='/thumbnail.jpeg'
    alt='Empty placeholder'
    className='w-full h-full object-cover'
  />
);

export default EmptyImagePlaceholder;