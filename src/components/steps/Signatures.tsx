import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useFormContext } from '../../context/FormContext';
import { Language } from '../../types/types';
import { RefreshCw, Upload } from 'lucide-react';

interface SignaturesProps {
  language: Language;
}

const Signatures: React.FC<SignaturesProps> = ({ language }) => {
  const { formData, updateFormData, clearSignature } = useFormContext();
  const sigCanvasA = useRef<SignatureCanvas>(null);
  const sigCanvasB = useRef<SignatureCanvas>(null);
  const [uploadMode, setUploadMode] = useState({
    partyA: false,
    partyB: false,
  });

  const handleClear = (party: 'A' | 'B') => {
    if (party === 'A' && sigCanvasA.current) {
      sigCanvasA.current.clear();
    } else if (party === 'B' && sigCanvasB.current) {
      sigCanvasB.current.clear();
    }
    clearSignature(party);
  };

  const handleSave = (party: 'A' | 'B') => {
    const sigCanvas = party === 'A' ? sigCanvasA.current : sigCanvasB.current;
    
    if (sigCanvas && !sigCanvas.isEmpty()) {
      const signatureData = sigCanvas.toDataURL('image/png');
      updateFormData(`signature${party}`, signatureData);
    }
  };

  const handleUpload = async (party: 'A' | 'B', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          updateFormData(`signature${party}`, event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const toggleUploadMode = (party: 'A' | 'B') => {
    setUploadMode((prev) => ({
      ...prev,
      [party === 'A' ? 'partyA' : 'partyB']: !prev[party === 'A' ? 'partyA' : 'partyB'],
    }));
    // Clear existing signature
    clearSignature(party);
  };

  const labels = {
    title: language === 'zh' ? '第3步：签名' : 'Step 3: Signatures',
    partyA: language === 'zh' ? '甲方签名' : 'Party A Signature',
    partyB: language === 'zh' ? '乙方签名' : 'Party B Signature',
    clear: language === 'zh' ? '清除' : 'Clear',
    save: language === 'zh' ? '保存' : 'Save',
    upload: language === 'zh' ? '上传签名' : 'Upload Signature',
    draw: language === 'zh' ? '手写签名' : 'Draw Signature',
    required: language === 'zh' ? '(必填)' : '(Required)',
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">{labels.title}</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">
              {labels.partyA} <span className="text-red-500">*</span>
            </h4>
            <button 
              onClick={() => toggleUploadMode('A')}
              className="text-sm text-blue-600 flex items-center gap-1"
            >
              {uploadMode.partyA ? (
                <>
                  <RefreshCw size={14} />
                  {labels.draw}
                </>
              ) : (
                <>
                  <Upload size={14} />
                  {labels.upload}
                </>
              )}
            </button>
          </div>
          
          {uploadMode.partyA ? (
            <div className="border border-gray-300 rounded-md p-4 text-center">
              <input
                type="file"
                id="signatureAUpload"
                accept="image/*"
                onChange={(e) => handleUpload('A', e)}
                className="hidden"
              />
              
              {formData.signatureA ? (
                <div className="flex flex-col items-center gap-2">
                  <img 
                    src={formData.signatureA} 
                    alt="Party A Signature" 
                    className="max-h-32 border border-gray-200"
                  />
                  <button
                    onClick={() => clearSignature('A')}
                    className="text-sm text-red-600"
                  >
                    {labels.clear}
                  </button>
                </div>
              ) : (
                <label 
                  htmlFor="signatureAUpload"
                  className="cursor-pointer flex flex-col items-center gap-2 py-8"
                >
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-gray-500">
                    {language === 'zh' ? '点击上传签名图片' : 'Click to upload signature image'}
                  </span>
                </label>
              )}
            </div>
          ) : (
            <div className="border border-gray-300 rounded-md p-2">
              <SignatureCanvas
                ref={sigCanvasA}
                canvasProps={{
                  width: 300,
                  height: 150,
                  className: 'signature-canvas bg-white',
                }}
                onEnd={() => handleSave('A')}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleClear('A')}
                  className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 mr-2"
                >
                  {labels.clear}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">
              {labels.partyB} <span className="text-red-500">*</span>
            </h4>
            <button 
              onClick={() => toggleUploadMode('B')}
              className="text-sm text-blue-600 flex items-center gap-1"
            >
              {uploadMode.partyB ? (
                <>
                  <RefreshCw size={14} />
                  {labels.draw}
                </>
              ) : (
                <>
                  <Upload size={14} />
                  {labels.upload}
                </>
              )}
            </button>
          </div>
          
          {uploadMode.partyB ? (
            <div className="border border-gray-300 rounded-md p-4 text-center">
              <input
                type="file"
                id="signatureBUpload"
                accept="image/*"
                onChange={(e) => handleUpload('B', e)}
                className="hidden"
              />
              
              {formData.signatureB ? (
                <div className="flex flex-col items-center gap-2">
                  <img 
                    src={formData.signatureB} 
                    alt="Party B Signature" 
                    className="max-h-32 border border-gray-200"
                  />
                  <button
                    onClick={() => clearSignature('B')}
                    className="text-sm text-red-600"
                  >
                    {labels.clear}
                  </button>
                </div>
              ) : (
                <label 
                  htmlFor="signatureBUpload"
                  className="cursor-pointer flex flex-col items-center gap-2 py-8"
                >
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-gray-500">
                    {language === 'zh' ? '点击上传签名图片' : 'Click to upload signature image'}
                  </span>
                </label>
              )}
            </div>
          ) : (
            <div className="border border-gray-300 rounded-md p-2">
              <SignatureCanvas
                ref={sigCanvasB}
                canvasProps={{
                  width: 300,
                  height: 150,
                  className: 'signature-canvas bg-white',
                }}
                onEnd={() => handleSave('B')}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleClear('B')}
                  className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 mr-2"
                >
                  {labels.clear}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        {language === 'zh' 
          ? '提示：您可以在上方框内签名，或上传签名图片。' 
          : 'Tip: You can sign in the box above or upload a signature image.'}
      </div>
    </div>
  );
};

export default Signatures;