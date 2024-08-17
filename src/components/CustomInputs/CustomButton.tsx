import React from "react";
import { CustomLoader } from "../CustomLoader";

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "underline" | "primary";
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  icon,
  className = "",
  variant = "default",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
}) => {
  const baseClasses =
    "rounded-lg inline-flex items-center gap-2 transition-colors duration-200";
  const variantClasses = {
    default: "py-2 px-4 bg-primary hover:bg-primary-dark text-white",
    underline: "text-primary hover:underline focus:outline-none bg-transparent",
    primary: "py-2 px-4 bg-primary hover:bg-primary-dark text-white",
  };
  const disabledClasses =
    "!bg-gray-500 text-gray-600 cursor-not-allowed !hover:bg-gray-500";
  const widthClass = fullWidth ? "w-full" : "";

  const buttonClasses = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${widthClass}
      ${className}
      ${disabled || isLoading ? disabledClasses : "cursor-pointer"}
    `.trim();

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled || isLoading}
      type="button"
    >
      {isLoading ? (
        <>
          <CustomLoader className='w-5 h-5 mr-2' />
          {loadingText}
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
};

export default CustomButton;
