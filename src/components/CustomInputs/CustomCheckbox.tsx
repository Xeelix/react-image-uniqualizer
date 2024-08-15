import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  return (
    <div 
      className={`w-5 h-5 border-2 rounded-md cursor-pointer flex items-center justify-center ${
        checked ? 'bg-primary border-primary' : 'border-gray-300'
      }`}
      onClick={() => onChange(!checked)}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
};