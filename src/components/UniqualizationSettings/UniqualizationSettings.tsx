import React from "react";
import { useForm } from "react-hook-form";
import { useImageStore } from "../../store/ImageStore";
import { UniqualizationSettingsForm } from "../../types";
import CopiesAndFolderStructure from "./CopiesAndFolderStructure";
import RotationSettings from "./RotationSettings";
import CropSettings from "./CropSettings"; // Import the new component
import { applyRotation } from "../../utils/applyRotation";
import { applyCrop } from "../../utils/applyCrop";

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
      saturation: { enabled: true, min: 90, max: 110 },
      brightness: { enabled: true, min: 90, max: 110 },
      contrast: { enabled: true, min: 90, max: 110 },
      reflection: "none",
      noise: { enabled: true, max: 0.1 },
      metadata: true,
    },
  });

  const onSubmit = async (data: UniqualizationSettingsForm) => {
    console.log(data);
    setSettings(data);
    
    for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i].original;
        img.onload = async () => {
          const rotatedImage = await applyRotation(img, data);
          const rotatedImg = new Image();
          rotatedImg.src = rotatedImage;
          rotatedImg.onload = async () => {
            const croppedImage = await applyCrop(rotatedImg, data);
            updateProcessedImage(i, croppedImage);
          };
        };
      }
      };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <CopiesAndFolderStructure control={control} />
      <RotationSettings control={control} />
      <CropSettings control={control} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UniqualizationSettings;