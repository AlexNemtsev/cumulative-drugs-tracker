import { IconButton } from '@radix-ui/themes';

import type { DoseRecord } from '@/shared/types/DoseRecord';

import { getCurrentMonthProgresses } from '../../lib/getCurrentMonthProgresses';
import { CircularProgress } from '../CircularProgress';
import { dayOfWeek } from './Day.css';

type Arguments = {
  date: Date;
  label: string;
};

export const renderDay =
  (records: Required<DoseRecord>[], currentDate: Date, onClick: (date: Date) => void) =>
  (args: Arguments) => {
    const { date, label } = args;

    const currentMonthProgresses = getCurrentMonthProgresses(records, currentDate);

    if (date.getMonth() === currentDate.getMonth()) {
      return (
        <IconButton variant="ghost" onClick={() => onClick(date)}>
          <CircularProgress progress={currentMonthProgresses.get(date.getDate()) ?? 0}>
            <div className={dayOfWeek[date.getDay() === 0 ? 'weekend' : 'weekday']}>{label}</div>
          </CircularProgress>
        </IconButton>
      );
    }

    return label;
  };
