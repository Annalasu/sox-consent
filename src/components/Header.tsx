import React from 'react';
import { Language } from '../types/types';
import { Globe } from 'lucide-react';

interface HeaderProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          {language === 'zh' ? '在线性同意书签订平台' : 'Online Sexual Consent Agreement'}
        </h1>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Globe size={16} />
          <span>{language === 'zh' ? 'English' : '中文'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;