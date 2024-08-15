import React, { useState } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const TextInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  return (
    <div className='relative inline-flex items-center w-43 h-11 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        className='w-full h-full px-3 text-lg focus:outline-none rounded-lg'
      />
      <div className='absolute right-1 h-full flex flex-col justify-center'>
        <button
          onClick={handleIncrement}
          className='px-1 focus:outline-none leading-none text-[#97A5BD] hover:text-[#6f7887]'
        >
          <IconChevronUp size={20} stroke={3} />
        </button>
        <button
          onClick={handleDecrement}
          className='px-1 focus:outline-none leading-none text-[#97A5BD] hover:text-[#6f7887]'
        >
          <IconChevronDown size={20} stroke={3} />
        </button>
      </div>
    </div>
  );
};
