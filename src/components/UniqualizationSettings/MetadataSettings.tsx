import React from "react";
import { Control, Controller } from "react-hook-form";
import { UniqualizationSettingsForm } from "../../types";
import { CustomCheckbox } from "../CustomInputs/CustomCheckbox";

interface MetadataSettingsProps {
  control: Control<UniqualizationSettingsForm>;
}

const MetadataSettings: React.FC<MetadataSettingsProps> = ({ control }) => {
  return (
    <div className='grid grid-cols-5 gap-6 items-center'>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-start gap-3'>
          <Controller
            control={control}
            name='metadata'
            render={({ field }) => (
              <CustomCheckbox checked={field.value} onChange={field.onChange} />
            )}
          />
          <label className='text-sm'>Метаданные:</label>
        </div>
      </div>
      <div className='col-span-4'>
        <label className='text-sm text-gray-400'>
          Изменить метаданные изображения
        </label>
      </div>
    </div>
  );
};

export default MetadataSettings;