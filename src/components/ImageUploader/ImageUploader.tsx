import React from "react";
import { IconUpload } from '@tabler/icons-react';
import CustomButton from '../CustomInputs/CustomButton';

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      onUpload(filesArray);
    }
  };

  const handleClick = () => {
    document.getElementById('image-upload')?.click();
  };

  return (
    <div className='mb-6'>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={handleFileChange}
        className='hidden'
        id='image-upload'
      />
      <CustomButton
        label="Загрузить изображения"
        onClick={handleClick}
        icon={<IconUpload size={20} />}
      />
    </div>
  );
};

export default ImageUploader;