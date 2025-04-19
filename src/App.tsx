import React, { useState } from 'react';
import Form from './components/Form';
import Header from './components/Header';
import { FormProvider } from './context/FormContext';
import { Language } from './types/types';

function App() {
  const [language, setLanguage] = useState<Language>('zh');

  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header language={language} setLanguage={setLanguage} />
        <main className="flex-1 flex flex-col items-center py-8 px-4 md:px-6">
          <Form language={language} />
        </main>
        <footer className="bg-white py-4 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {language === 'zh' ? '互联网同意书平台' : 'Online Consent Platform'}</p>
        </footer>
      </div>
    </FormProvider>
  );
}

export default App;