export type Settings = {
  name: string;
  activeIngredient: string;
  doses: string[];
  targetDose?: string;
  targetDosePerKilo?: string;
  weight?: string;
  dayTarget: string;
};
