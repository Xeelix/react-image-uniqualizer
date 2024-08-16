import React, { useState, useRef, useEffect } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

interface Option {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  getOptionLabel: (option: Option) => string;
  getOptionValue: (option: Option) => string;
}

export const CustomDropdown: React.FC<DropdownSelectProps> = ({
  options,
  value,
  onChange,
  className,
  getOptionLabel,
  getOptionValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    onChange(getOptionValue(option));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      setDropdownWidth(inputRef.current.offsetWidth);
    }
  }, []);

  const selectedOption = options.find(
    (option) => getOptionValue(option) === value
  );

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block w-full ${className}`}
    >
      <div
        onClick={toggleDropdown}
        className='relative inline-flex items-center h-11 w-full rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent cursor-pointer'
      >
        <input
          ref={inputRef}
          type='text'
          value={selectedOption ? getOptionLabel(selectedOption) : ""}
          readOnly
          className='w-full h-full px-3 text-lg focus:outline-none rounded-lg cursor-pointer bg-transparent text-gray-400'
        />
        <div className='absolute right-1 h-full flex flex-col justify-center pointer-events-none'>
          {isOpen ? (
            <IconChevronUp size={20} stroke={3} className='text-[#97A5BD]' />
          ) : (
            <IconChevronDown size={20} stroke={3} className='text-[#97A5BD]' />
          )}
        </div>
      </div>
      {isOpen && (
        <ul
          className='absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto text-gray-400'
          style={{ width: `${dropdownWidth}px` }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className='px-3 py-2 hover:bg-gray-100 cursor-pointer'
            >
              {getOptionLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
