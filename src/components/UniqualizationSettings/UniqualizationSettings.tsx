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

const UniqualizationSettings: React.FC = () => {
  const { images, settings, setSettings, updateProcessedImage } = useImageStore();
  const isProcessing = useRef(false);

  const { control, handleSubmit } = useForm<UniqualizationSettingsForm>({
    defaultValues: settings,
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

  useEffect(() => {
    handleSubmit((data) => processImages(images, data, setSettings, updateProcessedImage, isProcessing))();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedFields]);

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
      <MetadataSettings control={control} />
    </form>
  );
};

export default UniqualizationSettings;