import React from "react";
import { Control, Controller } from "react-hook-form";
import { UniqualizationSettingsForm } from "../../types";
import { CustomInput } from "../CustomInputs/CustomInput";
import { CustomCheckbox } from "../CustomInputs/CustomCheckbox";
import { CustomDropdown } from "../CustomInputs/CustomDropdown";

interface CropSettingsProps {
  control: Control<UniqualizationSettingsForm>;
}

const sideOptions = [
  { value: "random", label: "С одной случайной стороны" },
  { value: "top", label: "Сверху" },
  { value: "bottom", label: "Снизу" },
  { value: "left", label: "Слева" },
  { value: "right", label: "Справа" },
];
const CropSettings: React.FC<CropSettingsProps> = ({ control }) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-5 gap-6'>
        <div className='flex flex-col gap-1 items-start'>
          <div className='flex justify-start gap-3'>
            <Controller
              control={control}
              name='crop.enabled'
              render={({ field }) => (
                <CustomCheckbox
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <label className='text-sm'>Обрезка:</label>
          </div>
          <label className='text-sm text-gray-400'>
            Отступ от края изображения
          </label>
        </div>

        <div className='col-span-2'>
          <Controller
            control={control}
            name='crop.side'
            render={({ field }) => (
              <CustomDropdown
                value={field.value}
                onChange={field.onChange}
                options={sideOptions}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            )}
          />
          <div className='grid grid-cols-2 gap-6 mt-4'>
            <Controller
              control={control}
              name='crop.min'
              render={({ field }) => (
                <CustomInput
                  inputType='number'
                  value={field.value}
                  onChange={field.onChange}
                  min={0}
                  max={100}
                />
              )}
            />

            <Controller
              control={control}
              name='crop.max'
              render={({ field }) => (
                <CustomInput
                  inputType='number'
                  value={field.value}
                  onChange={field.onChange}
                  min={0}
                  max={100}
                />
              )}
            />
          </div>
        </div>
        <div className='col-span-2 flex items-end'>
          <label className='text-sm text-gray-400'>
            Не рекомендуется обрезать картинку больше, чем на 5-15 процентов
          </label>
        </div>
      </div>
    </div>
  );
};

export default CropSettings;
