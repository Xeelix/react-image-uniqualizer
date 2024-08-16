import React, { useEffect, useCallback, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useImageStore } from "../../store/ImageStore";
import { UniqualizationSettingsForm } from "../../types";
import CopiesAndFolderStructure from "./CopiesAndFolderStructure";
import RotationSettings from "./RotationSettings";
import CropSettings from "./CropSettings";
import { applyRotation } from "../../utils/applyRotation";
import { applyCrop } from "../../utils/applyCrop";
import SaturationSettings from "./SaturationSettings";
import { applySaturation } from "../../utils/applySaturation";
import BrightnessSettings from "./BrightnessSettings";
import { applyBrightness } from "../../utils/applyBrightness";
import ContrastSettings from "./ContrastSettings";
import { applyContrast } from "../../utils/applyContrast";
import ReflectionSettings from "./ReflectionSettings";
import { applyReflection } from "../../utils/applyReflection";
import NoiseSettings from "./NoiseSettings";
import { applyNoise } from "../../utils/applyNoise";

const UniqualizationSettings: React.FC = () => {
  const { images, setSettings, updateProcessedImage } = useImageStore();
  const isInitialRender = useRef(true);

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
      saturation: { enabled: true, min: 80, max: 120 },
      brightness: { enabled: true, min: 80, max: 120 },
      contrast: { enabled: true, min: 80, max: 120 },
      reflection: "none",
      noise: { enabled: true, max: 0.1 },
      metadata: true,
    },
  });

  const watchedFields = useWatch({
    control,
    name: [
      "rotation",
      "crop",
      "saturation",
      "brightness",
      "contrast",
      "reflection",
      "noise",
    ],
  });

  const onSubmit = async (data: UniqualizationSettingsForm) => {
    setSettings(data);

    for (let i = 0; i < images.length; i++) {
      const img = await loadImage(images[i].original);
      const processedImage = await processImage(img, data);
      updateProcessedImage(i, processedImage);
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  };

  const processImage = async (
    img: HTMLImageElement,
    data: UniqualizationSettingsForm
  ) => {
    const rotatedImage = await applyRotation(img, data);
    const rotatedImg = await loadImage(rotatedImage);

    const croppedImage = await applyCrop(rotatedImg, data);
    const croppedImg = await loadImage(croppedImage);

    const saturatedImage = await applySaturation(croppedImg, data);
    const saturatedImg = await loadImage(saturatedImage);

    const brightenedImage = await applyBrightness(saturatedImg, data);
    const brightenedImg = await loadImage(brightenedImage);

    const contrastedImage = await applyContrast(brightenedImg, data);
    const contrastedImg = await loadImage(contrastedImage);

    const reflectedImage = await applyReflection(contrastedImg, data);
    const reflectedImg = await loadImage(reflectedImage);

    const noisyImage = await applyNoise(reflectedImg, data);
    return noisyImage;
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (images.length > 0) {
      console.log("images.length > 0");
      handleSubmit(onSubmit)();
    }
  }, [watchedFields, images.length]);

  return (
    <form className='grid gap-4'>
      <CopiesAndFolderStructure control={control} />
      <RotationSettings control={control} />
      <CropSettings control={control} />
      <SaturationSettings control={control} />
      <BrightnessSettings control={control} />
      <ContrastSettings control={control} />
      <ReflectionSettings control={control} />
      <NoiseSettings control={control} />
    </form>
  );
};

export default UniqualizationSettings;
