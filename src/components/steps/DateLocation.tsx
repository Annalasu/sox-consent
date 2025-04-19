import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Language } from '../../types/types';

interface DateLocationProps {
  language: Language;
}

const DateLocation: React.FC<DateLocationProps> = ({ language }) => {
  const { formData, updateFormData } = useFormContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const labels = {
    date: language === 'zh' ? '日期' : 'Date',
    year: language === 'zh' ? '年' : 'Year',
    month: language === 'zh' ? '月' : 'Month',
    day: language === 'zh' ? '日' : 'Day',
    location: language === 'zh' ? '地点' : 'Location',
    required: language === 'zh' ? '(必填)' : '(Required)',
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        {language === 'zh' ? '第2步：日期和地点' : 'Step 2: Date and Location'}
      </h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.date} <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="date.year" className="block text-xs text-gray-500 mb-1">
                {labels.year}
              </label>
              <input
                type="text"
                id="date.year"
                name="date.year"
                value={formData.date.year}
                onChange={handleInputChange}
                placeholder={language === 'zh' ? '如：2025' : 'e.g., 2025'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="date.month" className="block text-xs text-gray-500 mb-1">
                {labels.month}
              </label>
              <input
                type="text"
                id="date.month"
                name="date.month"
                value={formData.date.month}
                onChange={handleInputChange}
                placeholder={language === 'zh' ? '如：12' : 'e.g., 12'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="date.day" className="block text-xs text-gray-500 mb-1">
                {labels.day}
              </label>
              <input
                type="text"
                id="date.day"
                name="date.day"
                value={formData.date.day}
                onChange={handleInputChange}
                placeholder={language === 'zh' ? '如：15' : 'e.g., 15'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            {labels.location} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder={language === 'zh' ? '如：上海市浦东新区XX路XX号' : 'e.g., 123 Main St, New York, NY'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        {language === 'zh' 
          ? '注意：日期和地点信息将显示在同意书上，表明双方同意的时间和地点。' 
          : 'Note: Date and location information will appear on the consent form, indicating when and where both parties agree.'}
      </div>
    </div>
  );
};

export default DateLocation;