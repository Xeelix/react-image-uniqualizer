import React from "react";
import { useForm } from "react-hook-form";
import { useImageStore } from "../../store/ImageStore";
import { UniqualizationSettingsForm } from "../../types";
import CopiesAndFolderStructure from "./CopiesAndFolderStructure";
import RotationSettings from "./RotationSettings";


const UniqualizationSettings: React.FC = () => {
  const { setSettings } = useImageStore();
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

  const onSubmit = (data: UniqualizationSettingsForm) => {
    setSettings(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <CopiesAndFolderStructure control={control} />
        <RotationSettings control={control} />
    </form>
  );
};

export default UniqualizationSettings;
