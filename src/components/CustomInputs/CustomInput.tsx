import React, { useState, useCallback } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import CustomNumberControlButton from "./CustomNumberControlButton";

interface InputProps {
  value: number | string;
  onChange: (value: number | string) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  inputType: "number" | "text";
  placeholder?: string;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
const round = (value: number): number => Math.round(value * 10) / 10;

export const CustomInput: React.FC<InputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
  inputType,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleNumericChange = useCallback(
    (newValue: string) => {
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue)) {
        const processedValue = round(clamp(numValue, min, max));
        setInputValue(processedValue.toString());
        onChange(processedValue);
      } else if (newValue === "" || newValue === "-") {
        setInputValue(newValue);
      }
    },
    [min, max, onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (inputType === "number") {
        handleNumericChange(newValue);
      } else {
        setInputValue(newValue);
        onChange(newValue);
      }
    },
    [inputType, handleNumericChange, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputType === "number") {
        e.preventDefault();
        handleNumericChange(inputValue);
      }
    },
    [inputType, handleNumericChange, inputValue]
  );

  const adjustValue = useCallback(
    (adjustment: number) => {
      if (inputType === "number") {
        const currentValue =
          typeof value === "number" ? value : parseFloat(value as string);
        const newValue = round(clamp(currentValue + adjustment, min, max));
        setInputValue(newValue.toString());
        onChange(newValue);
      }
    },
    [inputType, value, min, max, onChange]
  );

  const handleIncrement = useCallback(
    () => adjustValue(step),
    [adjustValue, step]
  );
  const handleDecrement = useCallback(
    () => adjustValue(-step),
    [adjustValue, step]
  );

  return (
    <div
      className={`relative inline-flex items-center h-11 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent ${className}`}
    >
      <input
        type={inputType === "number" ? "number" : "text"}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        min={inputType === "number" ? min : undefined}
        max={inputType === "number" ? max : undefined}
        step={inputType === "number" ? step : undefined}
        placeholder={placeholder}
        className='w-full h-full px-3 text-lg focus:outline-none rounded-lg text-gray-400'
      />
      {inputType === "number" && (
        <div className='absolute right-1 h-full flex flex-col justify-center'>
          <CustomNumberControlButton
            onClick={handleIncrement}
            icon={<IconChevronUp size={20} stroke={3} />}
          />
          <CustomNumberControlButton
            onClick={handleDecrement}
            icon={<IconChevronDown size={20} stroke={3} />}
          />
        </div>
      )}
    </div>
  );
};
