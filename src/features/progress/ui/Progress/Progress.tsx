import { Flex, Text, Card, Progress as ProgressBar } from '@radix-ui/themes';
import { useState } from 'react';

import { RecordModal } from '@/entities/record/ui/RecordModal';
import { AppSettings } from '@/shared/appSettings';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { RecordType } from '@/shared/types/Record';
import { AddButton } from '@/shared/ui/AddButton';

import { card, progressBar } from './Progress.css';

const dateConfig: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export const Progress = () => {
  const { records, addRecord } = useRecords();
  const [isRecordModalOpened, setIsRecordModalOpened] = useState(false);

  const openRecordModal = () => {
    setIsRecordModalOpened(true);
  };

  const closeRecordModal = () => {
    setIsRecordModalOpened(false);
  };

  const handleAddRecord = async (record: RecordType) => {
    await addRecord(record);

    closeRecordModal();
  };

  const cumulativeDose = records.reduce<number>((acc, record) => {
    const dose = +record.dose;

    return acc + dose;
  }, 0);

  const progressBarValue = (cumulativeDose / AppSettings.TARGET_DOSE) * 100;

  const doseRemained = AppSettings.TARGET_DOSE - cumulativeDose;
  const etaDays = doseRemained / +AppSettings.DAY_TARGET;

  const expectedDay = new Date();
  expectedDay.setDate(expectedDay.getDate() + Math.ceil(etaDays));

  return (
    <Flex direction="column" gap="5">
      <Card className={card}>
        <Flex direction="column" gap="4">
          <Text size="6">Суммарная доза</Text>
          <ProgressBar value={progressBarValue} className={progressBar} />
          <Text size="6">
            Принято {cumulativeDose} мг из {AppSettings.TARGET_DOSE} мг
          </Text>
          <Text size="5">
            Ожидаемое завершение – {expectedDay.toLocaleDateString('ru-RU', dateConfig)}
          </Text>
        </Flex>
      </Card>
      <AddButton onClick={openRecordModal} />
      <RecordModal
        isOpen={isRecordModalOpened}
        onSubmit={handleAddRecord}
        onCancel={closeRecordModal}
      />
    </Flex>
  );
};
