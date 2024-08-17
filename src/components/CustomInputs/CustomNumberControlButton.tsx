interface NumberControlButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
}

const CustomNumberControlButton: React.FC<NumberControlButtonProps> = ({
  onClick,
  icon,
}) => (
  <button
    onClick={onClick}
    className='px-1 focus:outline-none leading-none text-[#97A5BD] hover:text-[#6f7887] bg-white'
    tabIndex={-1}
    type='button'
  >
    {icon}
  </button>
);

export default CustomNumberControlButton;
