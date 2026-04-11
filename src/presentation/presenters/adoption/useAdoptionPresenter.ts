'use client';

import { useState, useCallback } from 'react';
import { CreateAdoptionRequestData, AdoptionRequest } from '@/src/application/repositories/IAdoptionRepository';
import { createClientAdoptionPresenter } from './AdoptionPresenterClientFactory';
import { toast } from '@/src/presentation/stores/useToastStore';

export type AdoptionStep = 1 | 2 | 3 | 4; // 1-3: Forms, 4: Success

export function useAdoptionPresenter(petId: string, petName: string) {
  const [presenter] = useState(() => createClientAdoptionPresenter());
  const [currentStep, setCurrentStep] = useState<AdoptionStep>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateAdoptionRequestData>>({
    petId,
    petName,
    applicantName: '',
    applicantPhone: '',
    applicantEmail: '',
    applicantOccupation: '',
    homeType: 'House',
    hasOtherPets: false,
    reason: '',
  });

  const nextStep = useCallback(() => {
     if (currentStep < 3) setCurrentStep((prev) => (prev + 1) as AdoptionStep);
  }, [currentStep]);

  const prevStep = useCallback(() => {
     if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as AdoptionStep);
  }, [currentStep]);

  const updateField = useCallback((field: keyof CreateAdoptionRequestData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const submit = useCallback(async () => {
    setLoading(true);
    try {
      const result = await presenter.submitRequest(formData as CreateAdoptionRequestData);
      if (result.isSuccess()) {
        setCurrentStep(4);
        toast.success('ส่งคำขอรับเลี้ยงเรียบร้อยแล้วครับ!');
      } else {
        toast.error(result.error.message);
      }
    } catch (err) {
      toast.error('เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  }, [formData, presenter]);

  return {
    currentStep,
    formData,
    loading,
    nextStep,
    prevStep,
    updateField,
    submit,
    setCurrentStep,
  };
}
