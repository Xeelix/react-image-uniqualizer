import React from "react";
import { Control, Controller } from "react-hook-form";
import { UniqualizationSettingsForm } from "../../types";
import { CustomInput } from "../CustomInputs/CustomInput";
import { CustomCheckbox } from "../CustomInputs/CustomCheckbox";

interface RotationSettingsProps {
  control: Control<UniqualizationSettingsForm>;
}

const RotationSettings: React.FC<RotationSettingsProps> = ({ control }) => {
  return (
    <div className='grid grid-cols-5 gap-6 items-center'>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-start gap-3'>
          <Controller
            control={control}
            name='rotation.enabled'
            render={({ field }) => (
              <CustomCheckbox checked={field.value} onChange={field.onChange} />
            )}
          />
          <label className='text-sm'>Поворот:</label>
        </div>
        <label className='text-sm text-gray-400'>
          Угол поворота картинки
        </label>
      </div>

      <Controller
        control={control}
        name='rotation.min'
        render={({ field }) => (
          <CustomInput
            inputType='number'
            value={field.value}
            onChange={field.onChange}
            min={-3}
            max={3}
          />
        )}
      />

      <Controller
        control={control}
        name='rotation.max'
        render={({ field }) => (
          <CustomInput
            inputType='number'
            value={field.value}
            onChange={field.onChange}
            min={-3}
            max={3}
          />
        )}
      />

      <label className='col-span-2 text-sm text-gray-400'>
        Поворот лучше совершать на 1-2 градуса
      </label>
    </div>
  );
};

export default RotationSettings;
