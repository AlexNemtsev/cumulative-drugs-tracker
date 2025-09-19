import { useState } from 'react';
import CalendarWidget from 'react-widgets/esm/Calendar';
import { DateLocalizer } from 'react-widgets/esm/IntlLocalizer';
import Localization from 'react-widgets/esm/Localization';
import 'react-widgets/styles.css';

import './Calendar.css';

import type { DoseRecord } from '@/shared/types/DoseRecord';

import { renderDay } from '../renderDay';

type Props = {
  records: Required<DoseRecord>[];
  onDayClick: (date: Date) => void;
};

export const Calendar = (props: Props) => {
  const { records, onDayClick } = props;
  const today = new Date();
  const [displayedDate, setDisplayedDate] = useState(today);

  const handleChangeDisplayedDate = (date: Date) => setDisplayedDate(date);

  return (
    <Localization
      date={new DateLocalizer({ culture: 'ru-RU', firstOfWeek: 1 })}
      messages={{ moveToday: 'Сегодня' }}
    >
      <CalendarWidget
        value={today}
        bordered={false}
        onNavigate={handleChangeDisplayedDate}
        onChange={handleChangeDisplayedDate}
        renderDay={renderDay(records, displayedDate, onDayClick)}
      />
    </Localization>
  );
};
