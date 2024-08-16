import React, { useState, KeyboardEvent } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

interface InputProps {
  value: number | string;
  onChange: (value: number | string) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  inputType: 'number' | 'text';
  placeholder?: string; // Added placeholder prop
}

export const CustomInput: React.FC<InputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  inputType,
  placeholder, // Destructure placeholder prop
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (inputType === 'number') {
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        const roundedValue = Math.round(numValue * 10) / 10;
        setInputValue(roundedValue.toString());
        onChange(roundedValue);
      } else if (newValue === '' || newValue === '-') {
        setInputValue(newValue);
      }
    } else {
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputType === 'number') {
        const numValue = parseFloat(inputValue);
        if (!isNaN(numValue) && numValue >= min && numValue <= max) {
          const roundedValue = Math.round(numValue * 10) / 10;
          onChange(roundedValue);
        } else {
          setInputValue(value.toString());
        }
      }
    }
  };

  const handleIncrement = () => {
    if (inputType === 'number') {
      const currentValue = typeof value === 'number' ? value : parseFloat(value as string);
      const newValue = Math.min(currentValue + step, max);
      const roundedValue = Math.round(newValue * 10) / 10;
      setInputValue(roundedValue.toString());
      onChange(roundedValue);
    }
  };

  const handleDecrement = () => {
    if (inputType === 'number') {
      const currentValue = typeof value === 'number' ? value : parseFloat(value as string);
      const newValue = Math.max(currentValue - step, min);
      const roundedValue = Math.round(newValue * 10) / 10;
      setInputValue(roundedValue.toString());
      onChange(roundedValue);
    }
  };

  return (
    <div className={`relative inline-flex items-center h-11 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent ${className}`}>
      <input
        type={inputType === 'number' ? 'number' : 'text'}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        min={inputType === 'number' ? min : undefined}
        max={inputType === 'number' ? max : undefined}
        step={inputType === 'number' ? step : undefined}
        placeholder={placeholder} // Added placeholder attribute
        className='w-full h-full px-3 text-lg focus:outline-none rounded-lg text-gray-400'
      />
      {inputType === 'number' && (
        <div className='absolute right-1 h-full flex flex-col justify-center'>
          <button
            onClick={handleIncrement}
            className='px-1 focus:outline-none leading-none text-[#97A5BD] hover:text-[#6f7887] bg-white'
            tabIndex={-1}
            type='button'
          >
            <IconChevronUp size={20} stroke={3} />
          </button>
          <button
            onClick={handleDecrement}
            className='px-1 focus:outline-none leading-none text-[#97A5BD] hover:text-[#6f7887] bg-white'
            tabIndex={-1}
            type='button'
          >
            <IconChevronDown size={20} stroke={3} />
          </button>
        </div>
      )}
    </div>
  );
};