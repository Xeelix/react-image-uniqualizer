import React, { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useImageStore } from "../../store/ImageStore";
import { UniqualizationSettingsForm } from "../../types";
import CopiesAndFolderStructure from "./CopiesAndFolderStructure";
import RotationSettings from "./RotationSettings";
import CropSettings from "./CropSettings";
import SaturationSettings from "./SaturationSettings";
import BrightnessSettings from "./BrightnessSettings";
import ContrastSettings from "./ContrastSettings";
import ReflectionSettings from "./ReflectionSettings";
import NoiseSettings from "./NoiseSettings";
import { processImages } from "../../utils/imageProcessing";
import MetadataSettings from "./MetadataSettings";
import NamingSettings from "./NamingSettings";

const UniqualizationSettings: React.FC = () => {
  const { images, settings, setSettings, setImages } = useImageStore();
  const isProcessing = useRef(false);
  const { control, handleSubmit } = useForm<UniqualizationSettingsForm>({
    defaultValues: settings,
  });

  const watchedImageViewFields = useWatch({
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

  const watchedSecondaryFields = useWatch({
    control,
    name: [
      "copies",
      "folderStructure",
      "naming",
      "prefix",
      "saveNamesList",
      "rightNumbering",
      "metadata",
    ],
  });

  useEffect(() => {
    handleSubmit((data) => setSettings(data))();
  }, [
    handleSubmit,
    setSettings,
    watchedImageViewFields,
    watchedSecondaryFields,
  ]);

  useEffect(() => {
    const processAndSetImages = async (data: UniqualizationSettingsForm) => {
      if (isProcessing.current) return;
      isProcessing.current = true;

      try {
        const processedImages = await processImages(images, data);
        setImages(processedImages);
      } catch (error) {
        console.error("Error processing images: ", error);
      } finally {
        isProcessing.current = false;
      }
    };

    handleSubmit((data) => processAndSetImages(data))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedImageViewFields]);

  return (
    <form className='grid gap-6'>
      <CopiesAndFolderStructure control={control} />
      <NamingSettings control={control} />
      <RotationSettings control={control} />
      <CropSettings control={control} />
      <SaturationSettings control={control} />
      <BrightnessSettings control={control} />
      <ContrastSettings control={control} />
      <ReflectionSettings control={control} />
      <NoiseSettings control={control} />
      <MetadataSettings control={control} />
    </form>
  );
};

export default UniqualizationSettings;
