import type { RecordType } from '@/shared/types/Record';

export const getCurrentMonthProgresses = (records: Required<RecordType>[], currentDate: Date) =>
  records.reduce<Map<number, number>>((acc, record) => {
    const date = new Date(record.datetime);

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
