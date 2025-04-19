import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Language } from '../../types/types';

interface PersonalInfoProps {
  language: Language;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ language }) => {
  const { formData, updateFormData } = useFormContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const labels = {
    partyAName: language === 'zh' ? '甲方姓名' : 'Party A Name',
    partyAId: language === 'zh' ? '甲方身份证号' : 'Party A ID Number',
    partyBName: language === 'zh' ? '乙方姓名' : 'Party B Name',
    partyBId: language === 'zh' ? '乙方身份证号' : 'Party B ID Number',
    required: language === 'zh' ? '(必填)' : '(Required)',
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        {language === 'zh' ? '第1步：填写个人信息' : 'Step 1: Personal Information'}
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">
            {language === 'zh' ? '甲方信息' : 'Party A Information'}
          </h4>
          <div>
            <label htmlFor="partyA.name" className="block text-sm font-medium text-gray-700 mb-1">
              {labels.partyAName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="partyA.name"
              name="partyA.name"
              value={formData.partyA.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="partyA.idNumber" className="block text-sm font-medium text-gray-700 mb-1">
              {labels.partyAId} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="partyA.idNumber"
              name="partyA.idNumber"
              value={formData.partyA.idNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">
            {language === 'zh' ? '乙方信息' : 'Party B Information'}
          </h4>
          <div>
            <label htmlFor="partyB.name" className="block text-sm font-medium text-gray-700 mb-1">
              {labels.partyBName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="partyB.name"
              name="partyB.name"
              value={formData.partyB.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="partyB.idNumber" className="block text-sm font-medium text-gray-700 mb-1">
              {labels.partyBId} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="partyB.idNumber"
              name="partyB.idNumber"
              value={formData.partyB.idNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        {language === 'zh' 
          ? '注意：请确保填写真实信息，这将用于生成同意书。' 
          : 'Note: Please ensure you enter accurate information as it will be used to generate the consent agreement.'}
      </div>
    </div>
  );
};

export default PersonalInfo;