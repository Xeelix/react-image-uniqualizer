import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { UniqualizationSettingsForm } from "../../types";
import { CustomInput } from "../CustomInputs/CustomInput";
import { CustomDropdown } from "../CustomInputs/CustomDropdown";
import FAQPopup from "./FAQPopup";

interface CopiesAndFolderStructureProps {
  control: Control<UniqualizationSettingsForm>;
}

const folderStructureOptions = [
  { value: "oneFolder", label: "Одна папка" },
  { value: "subfolders", label: "Создавая подпапки" },
  { value: "eachFolder", label: "В каждой папке набор из всех изображений" },
];

const CopiesAndFolderStructure: React.FC<CopiesAndFolderStructureProps> = ({ control }) => {
  const [showFAQ, setShowFAQ] = useState(false);

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
    console.log(showFAQ);
  };

  return (
    <div className="grid grid-cols-5 gap-6 items-center">
      <label className="text-sm font-medium text-gray-700">
        Количество копий:
      </label>

      <Controller
        control={control}
        name="copies"
        render={({ field }) => (
          <CustomInput
            inputType="number"
            value={field.value}
            onChange={field.onChange}
            max={30}
            placeholder="1"
          />
        )}
      />

      <Controller
        control={control}
        name="folderStructure"
        render={({ field }) => (
          <CustomDropdown
            value={field.value}
            onChange={field.onChange}
            options={folderStructureOptions}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
          />
        )}
      />
      <div className="col-span-2 flex justify-start">
        <button
          className="text-primary cursor-pointer hover:underline focus:outline-none"
          onClick={toggleFAQ}
          type="button"
        >
          Подробнее в FAQ
        </button>
      </div>
      {showFAQ && <FAQPopup onClose={toggleFAQ} />}
    </div>
  );
};

export default CopiesAndFolderStructure;