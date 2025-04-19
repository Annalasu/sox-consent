import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Language } from '../../types/types';

interface PreviewProps {
  language: Language;
}

const Preview: React.FC<PreviewProps> = ({ language }) => {
  const { formData, formRef } = useFormContext();

  const terms = {
    zh: [
      '双方基于互相爱慕资源发生性关系，期间不设计金钱等利益交换（入住酒店及娱乐费用视为自愿承担不计入利益交换行为中）。',
      '双方发生性关系期间必须确保采取了避孕与性传播疾病的防护措施。',
      '基于双方的性趣经协商发生性关系期间可以采取的性交方式包括：',
      '基于双方的性趣经协商发生性关系期间可以使用的防护器具包含有：',
      '双方不经过对方同意不得拍摄任何涉及双方亲密行为的语言、照片与视频，不经对方同意不得向任何第三方出示任何涉及双方亲密行为的语言、照片、视频及文字描述。',
      '如一方或双方采取 SM、绑缚、窒息、多 P 等涉及人身危害或法律明令禁止的行为，均不在此同意书允许范围内。'
    ],
    en: [
      'Both parties engage in sexual relations based on mutual attraction, without any monetary or benefit exchange (hotel accommodation and entertainment expenses are considered voluntary and not included in benefit exchange).',
      'Both parties must ensure that contraceptive and STD prevention measures are taken during sexual relations.',
      'Based on mutual interest and negotiation, the sexual activities that may be performed during the relationship include:',
      'Based on mutual interest and negotiation, the protective devices that may be used during the relationship include:',
      'Neither party shall, without the consent of the other party, take any language, photos, or videos involving intimate acts between the parties, nor shall they, without the consent of the other party, show any language, photos, videos, or text descriptions involving intimate acts between the parties to any third party.',
      'If one or both parties engage in activities involving personal harm or prohibited by law, such as SM, bondage, asphyxiation, multiple partners, etc., these are not permitted under this consent agreement.'
    ]
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        {language === 'zh' ? '第4步：预览同意书' : 'Step 4: Preview Agreement'}
      </h3>
      
      <div 
        ref={formRef}
        className="border border-gray-300 rounded-lg p-6 bg-white"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">
            {language === 'zh' ? '自愿发生性关系同意书' : 'Voluntary Sexual Relations Consent Agreement'}
          </h2>
        </div>

        <div className="space-y-4 text-sm">
          <p>
            {language === 'zh' ? '甲方：' : 'Party A: '} 
            <span className="underline px-2">{formData.partyA.name}</span> 
            {language === 'zh' ? '身份证号：' : 'ID Number: '} 
            <span className="underline px-2">{formData.partyA.idNumber}</span>
          </p>
          
          <p>
            {language === 'zh' ? '乙方：' : 'Party B: '} 
            <span className="underline px-2">{formData.partyB.name}</span> 
            {language === 'zh' ? '身份证号：' : 'ID Number: '} 
            <span className="underline px-2">{formData.partyB.idNumber}</span>
          </p>
          
          <p>
            {language === 'zh'
              ? `甲方与乙方约定在${formData.date.year}年${formData.date.month}月${formData.date.day}日${formData.location}`
              : `Party A and Party B agree on ${formData.date.month}/${formData.date.day}/${formData.date.year} at ${formData.location}`
            } 
            {language === 'zh'
              ? '自愿发生性关系，并承诺在以下条件内不得事后追究对方责任。'
              : 'to voluntarily engage in sexual relations, and promise not to hold the other party responsible afterwards within the following conditions.'
            }
          </p>
          
          <ol className="list-decimal pl-5 space-y-2">
            {terms[language].map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ol>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div>
              <p className="mb-2">{language === 'zh' ? '甲方签字：' : 'Party A Signature:'}</p>
              {formData.signatureA ? (
                <img 
                  src={formData.signatureA} 
                  alt="Party A Signature" 
                  className="max-h-20 border border-gray-200"
                />
              ) : (
                <div className="h-20 border border-gray-300"></div>
              )}
            </div>
            <div>
              <p className="mb-2">{language === 'zh' ? '乙方签字：' : 'Party B Signature:'}</p>
              {formData.signatureB ? (
                <img 
                  src={formData.signatureB} 
                  alt="Party B Signature" 
                  className="max-h-20 border border-gray-200"
                />
              ) : (
                <div className="h-20 border border-gray-300"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        {language === 'zh'
          ? '请仔细核对上述同意书内容。如果需要修改信息，请返回之前的步骤。满意后，您可以导出文档。'
          : 'Please carefully review the consent agreement above. If you need to modify any information, please return to the previous steps. When satisfied, you can export the document.'}
      </div>
    </div>
  );
};

export default Preview;