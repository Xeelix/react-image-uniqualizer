import React from 'react';
import EmptyImageColumn from './EmptyImageColumn';

const EmptyImagePair: React.FC = () => (
  <div className='flex justify-between mb-4'>
    <EmptyImageColumn title="Оригинал" />
    <EmptyImageColumn title="Обработанное" />
  </div>
);

export default EmptyImagePair;