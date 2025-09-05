import { useState } from 'react';
import CalendarWidget from 'react-widgets/esm/Calendar';
import { DateLocalizer } from 'react-widgets/esm/IntlLocalizer';
import Localization from 'react-widgets/esm/Localization';
import 'react-widgets/styles.css';

import './Calendar.css';
import type { RecordType } from '@/shared/types/Record';

import { renderDay } from '../renderDay';

type Props = {
  records: Required<RecordType>[];
};

export const Calendar = (props: Props) => {
  const { records } = props;
  const today = new Date();
  const [displayedDate, setDisplayedDate] = useState(today);

  return (
    <Localization
      date={new DateLocalizer({ culture: 'ru-RU', firstOfWeek: 1 })}
      messages={{ moveToday: 'Сегодня' }}
    >
      <CalendarWidget
        value={today}
        bordered={false}
        onNavigate={(date) => setDisplayedDate(date)}
        onChange={(date) => setDisplayedDate(date)}
        renderDay={renderDay(records, displayedDate)}
      />
    </Localization>
  );
};
