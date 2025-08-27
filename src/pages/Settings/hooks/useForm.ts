import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

import { useSettings } from '@/shared/providers/SettingsProvider';
import type { Settings as SettingsType } from '@/shared/types/Settings';

export const useForm = () => {
  const formRefs = useRef<Partial<Record<keyof SettingsType, HTMLInputElement | null>>>({});
  const { settings, updateSettings } = useSettings();
  const [_, navigate] = useLocation();

  useEffect(() => {
    if (!settings) {
      return;
    }

    (Object.keys(settings) as (keyof SettingsType)[]).forEach((key) => {
      if (formRefs.current[key]) {
        formRefs.current[key]!.value = settings[key]?.toString() || '';
      }
    });
  }, [settings]);

  const registerInputRef = (name: keyof SettingsType) => (el: HTMLInputElement) => {
    formRefs.current[name] = el;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      formRefs.current.activeIngredient &&
      formRefs.current.bodyWeight &&
      formRefs.current.dayTarget &&
      formRefs.current.name &&
      formRefs.current.targetDose &&
      formRefs.current.targetDosePerKilo
    ) {
      const updatedSettings: SettingsType = {
        activeIngredient: formRefs.current.activeIngredient.value,
        bodyWeight: formRefs.current.bodyWeight.value,
        dayTarget: formRefs.current.dayTarget.value,
        name: formRefs.current.name.value,
        targetDose: formRefs.current.targetDose.value,
        targetDosePerKilo: formRefs.current.targetDosePerKilo.value,
      };

      updateSettings(updatedSettings);
      navigate('/');
    }
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      formRefs.current.targetDose &&
      formRefs.current.bodyWeight &&
      formRefs.current.targetDosePerKilo
    ) {
      const bodyWeight = +formRefs.current.bodyWeight.value;
      const targetDosePerKilo = +formRefs.current.targetDosePerKilo.value;
      const targetDose = targetDosePerKilo * bodyWeight;
      formRefs.current.targetDose.value = targetDose.toString();
    }
  };

  const handleInvalid = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return {
    registerInputRef,
    handleSubmit,
    handleChange,
    handleInvalid,
  };
};
