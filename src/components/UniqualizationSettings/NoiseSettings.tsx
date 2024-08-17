import React from "react";
import { Control, Controller } from "react-hook-form";
import { UniqualizationSettingsForm } from "../../types";
import { CustomInput } from "../CustomInputs/CustomInput";
import { CustomCheckbox } from "../CustomInputs/CustomCheckbox";

interface NoiseSettingsProps {
  control: Control<UniqualizationSettingsForm>;
}

const NoiseSettings: React.FC<NoiseSettingsProps> = ({ control }) => {
  return (
    <div className='grid grid-cols-5 gap-6 items-center'>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-start gap-3'>
          <Controller
            control={control}
            name='noise.enabled'
            render={({ field }) => (
              <CustomCheckbox checked={field.value} onChange={field.onChange} />
            )}
          />
          <label className='text-sm'>Шум:</label>
        </div>
        <label className='text-sm text-gray-400'>
          Максимальный радиус шума
        </label>
      </div>

      <div className='col-span-2'>
        <Controller
          control={control}
          name='noise.max'
          render={({ field }) => (
            <CustomInput
              className='w-full'
              inputType='number'
              value={field.value}
              onChange={field.onChange}
              min={0.1}
              max={1}
              step={0.1}
            />
          )}
        />
      </div>
    </div>
  );
};

export default NoiseSettings;
