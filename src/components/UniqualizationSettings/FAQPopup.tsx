import React, { useEffect, useState, useRef, useCallback } from "react";
import CustomButton from "../CustomInputs/CustomButton";

interface FAQPopupProps {
  onClose: () => void;
}

const FAQPopup: React.FC<FAQPopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    setIsVisible(true);

    const handleOutsideClick = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleClose]);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div ref={popupRef} className={`bg-white p-6 rounded-lg max-w-2xl transform transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-90'}`}>
        <h2 className='text-xl font-bold mb-4'>
          Режимы сохранения уникальных изображений
        </h2>
        <p className='mb-4'>
          Наш сервис позволяет сохранять изображения и списки файлов в формате
          txt для дальнейшего использования в файлах импорта в программы
          постинга (Например, avitool, postgood или иных):
        </p>
        <ul className='list-disc pl-6 mb-4'>
          <li>
            <strong>В одну папку</strong> - Все изображения, которые вы
            загрузили будут сохранены в одну папку и заархивированы в .zip архив
            для скачивания.
          </li>
          <li>
            <strong>Создавая подпапки</strong> - Для каждого изображения будет
            создана отдельная папка, в которой будут находиться все копии
            данного изображения.
          </li>
          <li>
            <strong>В каждой папке набор из всех изображений</strong> - Данная
            опция говорит сама за себя. Сколько копий вы установили в
            настройках, столько папок с уникальными копиями каждой картинки вы и
            получите.
          </li>
        </ul>
        <div className='flex justify-end'>
          <CustomButton label='Закрыть' onClick={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default FAQPopup;