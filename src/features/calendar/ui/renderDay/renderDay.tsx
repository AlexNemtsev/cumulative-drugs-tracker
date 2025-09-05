import type { RecordType } from '@/shared/types/Record';

import { getCurrentMonthProgresses } from '../../lib/getCurrentMonthProgresses';
import { CircularProgress } from '../CircularProgress';
import { dayOfWeek } from './Day.css';

type Arguments = {
  date: Date;
  label: string;
};

export const renderDay =
  (records: Required<RecordType>[], currentDate: Date) => (args: Arguments) => {
    const { date, label } = args;

    const currentMonthProgresses = getCurrentMonthProgresses(records, currentDate);

    if (date.getMonth() === currentDate.getMonth()) {
      return (
        <CircularProgress progress={currentMonthProgresses.get(date.getDate()) ?? 0}>
          <div className={dayOfWeek[date.getDay() === 0 ? 'weekend' : 'weekday']}>{label}</div>
        </CircularProgress>
      );
    }

    return label;
  };
