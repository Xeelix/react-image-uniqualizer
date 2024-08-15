import React from "react";
import { Control, Controller } from "react-hook-form";
import { UniqualizationSettingsForm } from "../../types";
import { CustomInput } from "../CustomInputs/CustomInput";
import { CustomCheckbox } from "../CustomInputs/CustomCheckbox";

interface SaturationSettingsProps {
  control: Control<UniqualizationSettingsForm>;
}

const SaturationSettings: React.FC<SaturationSettingsProps> = ({ control }) => {
  return (
    <div className='grid grid-cols-5 gap-6 items-center'>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-start gap-3'>
          <Controller
            control={control}
            name='saturation.enabled'
            render={({ field }) => (
              <CustomCheckbox checked={field.value} onChange={field.onChange} />
            )}
          />
          <label className='text-sm'>Насыщенность:</label>
        </div>
        <label className='text-sm text-gray-400'>
          Выберите значение от 0 до 200
        </label>
      </div>

      <Controller
        control={control}
        name='saturation.min'
        render={({ field }) => (
          <CustomInput
            inputType='number'
            value={field.value}
            onChange={field.onChange}
            min={0}
            max={200}
          />
        )}
      />

      <Controller
        control={control}
        name='saturation.max'
        render={({ field }) => (
          <CustomInput
            inputType='number'
            value={field.value}
            onChange={field.onChange}
            min={0}
            max={200}
          />
        )}
      />

      <label className='col-span-2 text-sm text-gray-400'>
        Рекомендуется устанавливать значение больше 80 и меньше 120
      </label>
    </div>
  );
};

export default SaturationSettings;
