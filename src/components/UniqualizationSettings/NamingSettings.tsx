import React from "react";
import { Control, Controller } from "react-hook-form";
import { UniqualizationSettingsForm } from "../../types";
import { CustomDropdown } from "../CustomInputs/CustomDropdown";
import { CustomInput } from "../CustomInputs/CustomInput";
import { CustomCheckbox } from "../CustomInputs/CustomCheckbox";

interface NamingSettingsProps {
  control: Control<UniqualizationSettingsForm>;
}

const namingOptions = [
  { value: "hash", label: "Хешированные" },
  { value: "sequential", label: "По порядку" },
  { value: "original", label: "Исходные" },
];

const NamingSettings: React.FC<NamingSettingsProps> = ({ control }) => {
  return (
    <div className='grid grid-cols-5 gap-6 items-center'>
      <label className='text-sm font-medium text-gray-700'>
        Название изображений:
      </label>

      <div className='col-span-1'>
        <Controller
          control={control}
          name='naming'
          render={({ field }) => (
            <CustomDropdown
              value={field.value}
              onChange={field.onChange}
              options={namingOptions}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
            />
          )}
        />
      </div>

      <div className='col-span-1'>
        <Controller
          control={control}
          name='prefix'
          render={({ field }) => (
            <CustomInput
              inputType='text'
              value={field.value}
              onChange={field.onChange}
              className='w-full'
              placeholder='Префикс'
            />
          )}
        />
      </div>

      <div className='col-span-2 flex flex-col items-start gap-1'>
        <Controller
          control={control}
          name='saveNamesList'
          render={({ field }) => (
            <div className='flex items-center gap-2'>
              <CustomCheckbox checked={field.value} onChange={field.onChange} />
              <label className='text-sm text-gray-600'>
                Сохранять список названий в txt файл в архиве
              </label>
            </div>
          )}
        />
        <Controller
          control={control}
          name='rightNumbering'
          render={({ field }) => (
            <div className='flex items-center gap-2'>
              <CustomCheckbox checked={field.value} onChange={field.onChange} />
              <label className='text-sm text-gray-600'>Нумерация справа</label>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default NamingSettings;
