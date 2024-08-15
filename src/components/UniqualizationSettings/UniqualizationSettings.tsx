import React from "react";
import { useForm } from "react-hook-form";
import { useImageStore } from "../../store/ImageStore";
import { UniqualizationSettingsForm } from "../../types";
import CopiesAndFolderStructure from "./CopiesAndFolderStructure";
import RotationSettings from "./RotationSettings";
import CropSettings from "./CropSettings";
import { applyRotation } from "../../utils/applyRotation";
import { applyCrop } from "../../utils/applyCrop";
import SaturationSettings from "./SaturationSettings";
import { applySaturation } from "../../utils/applySaturation";

const UniqualizationSettings: React.FC = () => {
  const { images, setSettings, updateProcessedImage } = useImageStore();

  const { control, handleSubmit } = useForm<UniqualizationSettingsForm>({
    defaultValues: {
      copies: 1,
      folderSrtucture: "oneFolder",
      naming: "hash",
      prefix: "",
      saveNamesList: true,
      rightNumbering: true,
      rotation: { enabled: true, min: -3, max: 3 },
      crop: { enabled: true, side: "random", min: 1, max: 3 },
      saturation: { enabled: true, min: 2, max: 20 },
      brightness: { enabled: true, min: 90, max: 110 },
      contrast: { enabled: true, min: 90, max: 110 },
      reflection: "none",
      noise: { enabled: true, max: 0.1 },
      metadata: true,
    },
  });

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  };

  const processImage = async (img: HTMLImageElement, data: UniqualizationSettingsForm) => {
    const rotatedImage = await applyRotation(img, data);
    const rotatedImg = await loadImage(rotatedImage);

    const croppedImage = await applyCrop(rotatedImg, data);
    const croppedImg = await loadImage(croppedImage);

    const saturatedImage = await applySaturation(croppedImg, data);
    return saturatedImage;
  };

  const onSubmit = async (data: UniqualizationSettingsForm) => {
    setSettings(data);

    for (let i = 0; i < images.length; i++) {
      const img = await loadImage(images[i].original);
      const processedImage = await processImage(img, data);
      updateProcessedImage(i, processedImage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
      <CopiesAndFolderStructure control={control} />
      <RotationSettings control={control} />
      <CropSettings control={control} />
      <SaturationSettings control={control} />

      <button type='submit'>Submit</button>
    </form>
  );
};

export default UniqualizationSettings;