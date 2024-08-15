import React from 'react';
import EmptyImagePlaceholder from '../EmptyImagePlaceholder/EmptyImagePlaceholder';

interface EmptyImageColumnProps {
  title: string;
}

const EmptyImageColumn: React.FC<EmptyImageColumnProps> = ({ title }) => (
  <div className='w-1/2 px-2'>
    <h2 className='text-xl font-semibold mb-2'>{title}</h2>
    <div className='w-full h-[300px] border shadow-sm border-gray-300 rounded-lg overflow-hidden'>
      <EmptyImagePlaceholder />
    </div>
  </div>
);

export default EmptyImageColumn;