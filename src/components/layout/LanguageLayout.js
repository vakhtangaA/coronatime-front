import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageLayout({ children }) {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <div>{children}</div>
      <div className='absolute bottom-4 left-10'>
        <button
          onClick={() => changeLanguage('ka')}
          className='mr-2 underline font-semibold text-gray-600'
        >
          ka
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className='mr-2 underline font-semibold text-gray-600'
        >
          en
        </button>
      </div>
    </>
  );
}

export default LanguageLayout;
