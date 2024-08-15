import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useImageStore } from "../../store/ImageStore";
import { UniqualizationSettingsForm } from "../../types";
import { TextInput } from "../CustomInputs/TextInput";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-3 gap-4 items-center'>
        <label className='text-sm font-medium text-gray-700'>
          Количество копий:
        </label>

        <Controller
          control={control}
          name='copies'
          render={({ field }) => (
            <TextInput 
            value={field.value} 
            onChange={field.onChange} 
            />
          )}
        />
      </div>
    </form>
  );
};

export default UniqualizationSettings;
