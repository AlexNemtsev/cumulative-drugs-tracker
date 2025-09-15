import type { DoseRecord } from '@/shared/types/DoseRecord';

export const getCurrentMonthProgresses = (records: Required<DoseRecord>[], currentDate: Date) =>
  records.reduce<Map<number, number>>((acc, record) => {
    const { date } = record;

    const isDateInCurrentMonth =
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();

    if (!isDateInCurrentMonth) {
      return acc;
    }

    const day = date.getDate();
    acc.set(day, (acc.get(day) || 0) + +record.dose / +record.targetDose);

    return acc;
  }, new Map());
