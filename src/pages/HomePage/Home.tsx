import { Flex, Text } from '@radix-ui/themes';
import { useState } from 'react';

import { Calendar } from '@/features/calendar';
import { useRecords } from '@/shared/providers/RecordsProvider';
import { useSettings } from '@/shared/providers/SettingsProvider';
import { PageTitle } from '@/shared/ui/PageTitle';

import { DayModal } from './ui/DayModal';
import { Progress } from './ui/Progress';
import { SettingsButton } from './ui/SettingsButton';

const areDatesEqual = (date1: Date, date2: Date) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const Home = () => {
  const { records } = useRecords();
  const { settings } = useSettings();

  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const takenDose = records.reduce<number>((acc, record) => {
    const dose = +record.dose;

    return acc + dose;
  }, 0);

  const filteredRecords = records.filter((record) => areDatesEqual(record.date, selectedDate));

  const selectDay = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpened(true);
  };

  return (
    <Flex direction="column" gap="5">
      <PageTitle>{settings?.name}</PageTitle>
      <Text size="5" align="center" weight="light">
        {settings?.activeIngredient}
      </Text>
      <SettingsButton />
      <Progress
        takenDose={takenDose}
        dayTargetDose={+(settings?.dayTarget ?? 0)}
        totalTargetDose={+(settings?.targetDose ?? 0)}
        currentDate={currentDate}
      />
      <Calendar records={records} onDayClick={selectDay} />
      <DayModal
        date={selectedDate}
        records={filteredRecords}
        isOpen={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      />
    </Flex>
  );
};
