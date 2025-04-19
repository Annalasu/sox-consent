export type Language = 'zh' | 'en';

export interface FormData {
  partyA: {
    name: string;
    idNumber: string;
  };
  partyB: {
    name: string;
    idNumber: string;
  };
  date: {
    year: string;
    month: string;
    day: string;
  };
  location: string;
  signatureA: string;
  signatureB: string;
}

export interface FormContextType {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
  clearSignature: (party: 'A' | 'B') => void;
  formStep: number;
  setFormStep: (step: number) => void;
  validateCurrentStep: () => boolean;
  formRef: React.RefObject<HTMLDivElement>;
}