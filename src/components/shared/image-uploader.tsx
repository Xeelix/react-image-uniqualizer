import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { IconUpload } from '@tabler/icons-react';

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
      <label
        htmlFor='image-upload'
        className='bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md cursor-pointer inline-flex items-center gap-2'
      >
        <IconUpload size={20} />
        Загрузить изображения
      </label>
    </div>
  )
};

export default ImageUploader;
