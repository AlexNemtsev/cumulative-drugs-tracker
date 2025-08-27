import type { Settings } from '../types/Settings';

export const SettingsKeys: Record<string, keyof Settings> = {
  NAME: 'name',
  ACTIVE_INGREDIENT: 'activeIngredient',
  DOSE_PER_KILO: 'targetDosePerKilo',
  BODY_WEIGHT: 'bodyWeight',
  DAY_TARGET: 'dayTarget',
  TARGET_DOSE: 'targetDose',
} as const;
