import React from "react";
import { Control, Controller } from "react-hook-form";
import { UniqualizationSettingsForm } from "../../types";
import { CustomDropdown } from "../CustomInputs/CustomDropdown";

interface ReflectionSettingsProps {
  control: Control<UniqualizationSettingsForm>;
}

const reflectionOptions = [
  { value: "none", label: "Без отражения" },
  { value: "horizontal", label: "По горизонтали" },
  { value: "vertical", label: "По вертикали" },
  { value: "both", label: "По горизонтали и по вертикали" },
];

const ReflectionSettings: React.FC<ReflectionSettingsProps> = ({ control }) => {
  return (
    <div className='grid grid-cols-5 gap-6 items-center'>
      <label className='text-sm'>Отражение:</label>
      <div className='col-span-2'>
        <Controller
          control={control}
          name='reflection'
          render={({ field }) => (
            <CustomDropdown
              value={field.value}
              onChange={field.onChange}
              options={reflectionOptions}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
            />
          )}
        />
      </div>
      <div className='col-span-2'>
        <label className='text-sm text-gray-400'>
          Выберите тип отражения для изображения
        </label>
      </div>
    </div>
  );
};

export default ReflectionSettings;
