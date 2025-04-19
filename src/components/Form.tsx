import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import PersonalInfo from './steps/PersonalInfo';
import DateLocation from './steps/DateLocation';
import Signatures from './steps/Signatures';
import Preview from './steps/Preview';
import { Language } from '../types/types';
import { ChevronLeft, ChevronRight, FileText, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface FormProps {
  language: Language;
}

const Form: React.FC<FormProps> = ({ language }) => {
  const { formStep, setFormStep, validateCurrentStep, formRef } = useFormContext();
  const [isExporting, setIsExporting] = useState(false);

  const steps = [
    { id: 0, name: language === 'zh' ? '个人信息' : 'Personal Information', component: <PersonalInfo language={language} /> },
    { id: 1, name: language === 'zh' ? '日期和地点' : 'Date and Location', component: <DateLocation language={language} /> },
    { id: 2, name: language === 'zh' ? '签名' : 'Signatures', component: <Signatures language={language} /> },
    { id: 3, name: language === 'zh' ? '预览' : 'Preview', component: <Preview language={language} /> },
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
      setFormStep(formStep + 1);
    } else {
      alert(language === 'zh' ? '请填写所有必填字段' : 'Please fill in all required fields');
    }
  };

  const handlePrevious = () => {
    setFormStep(formStep - 1);
  };

  const exportToPDF = async () => {
    if (!formRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(formRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('consent-agreement.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert(language === 'zh' ? '导出PDF时出错' : 'Error exporting PDF');
    }
    setIsExporting(false);
  };

  const exportToImage = async () => {
    if (!formRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(formRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'consent-agreement.png';
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
      alert(language === 'zh' ? '导出图片时出错' : 'Error exporting image');
    }
    setIsExporting(false);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {language === 'zh' ? '自愿发生性关系同意书' : 'Voluntary Sexual Relations Consent Agreement'}
        </h2>
        
        <div className="flex items-center justify-center mb-6">
          <ol className="flex w-full max-w-2xl">
            {steps.map((step) => (
              <li 
                key={step.id} 
                className={`flex-1 relative ${
                  formStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-white ${
                      formStep >= step.id ? 'border-blue-600' : 'border-gray-300'
                    }`}
                  >
                    {formStep > step.id ? (
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className={`text-sm ${formStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                        {step.id + 1}
                      </span>
                    )}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.name}</span>
                </div>
                {step.id < steps.length - 1 && (
                  <div 
                    className={`absolute top-4 w-full left-1/2 h-0.5 ${
                      formStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  ></div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>{steps[formStep].component}</div>

      <div className="mt-8 flex justify-between">
        {formStep > 0 ? (
          <button
            onClick={handlePrevious}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={18} />
            <span>{language === 'zh' ? '上一步' : 'Previous'}</span>
          </button>
        ) : (
          <div></div>
        )}

        {formStep < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <span>{language === 'zh' ? '下一步' : 'Next'}</span>
            <ChevronRight size={18} />
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={exportToPDF}
              disabled={isExporting}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              <FileText size={18} className="mr-1" />
              <span>{language === 'zh' ? '导出PDF' : 'Export PDF'}</span>
            </button>
            <button
              onClick={exportToImage}
              disabled={isExporting}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300"
            >
              <Download size={18} className="mr-1" />
              <span>{language === 'zh' ? '导出图片' : 'Export Image'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;