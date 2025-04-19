import React, { createContext, useContext, useState, useRef } from 'react';
import { FormContextType, FormData } from '../types/types';

const initialFormData: FormData = {
  partyA: { name: '', idNumber: '' },
  partyB: { name: '', idNumber: '' },
  date: { year: '', month: '', day: '' },
  location: '',
  signatureA: '',
  signatureB: '',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formStep, setFormStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => {
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0] as keyof FormData],
            [keys[1]]: value,
          },
        };
      }
      return prev;
    });
  };

  const clearSignature = (party: 'A' | 'B') => {
    setFormData((prev) => ({
      ...prev,
      [`signature${party}`]: '',
    }));
  };

  const validateCurrentStep = () => {
    switch (formStep) {
      case 0: // Personal info
        return (
          formData.partyA.name.trim() !== '' &&
          formData.partyA.idNumber.trim() !== '' &&
          formData.partyB.name.trim() !== '' &&
          formData.partyB.idNumber.trim() !== ''
        );
      case 1: // Date and location
        return (
          formData.date.year.trim() !== '' &&
          formData.date.month.trim() !== '' &&
          formData.date.day.trim() !== '' &&
          formData.location.trim() !== ''
        );
      case 2: // Signature
        return formData.signatureA !== '' && formData.signatureB !== '';
      default:
        return true;
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        clearSignature,
        formStep,
        setFormStep,
        validateCurrentStep,
        formRef,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};