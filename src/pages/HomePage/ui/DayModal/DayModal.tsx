import { Button, Dialog, Flex } from '@radix-ui/themes';
import { useState } from 'react';

import type { FormValue } from '@/entities/record/ui/RecordForm';
import { RecordModal } from '@/entities/record/ui/RecordModal';
import { Records } from '@/features/records';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { DoseRecord } from '@/shared/types/DoseRecord';

type Props = {
  isOpen: boolean;
  records: Required<DoseRecord>[];
  date: Date;
  onClose: () => void;
};

export const DayModal = (props: Props) => {
  const { isOpen, date, records, onClose: onMaskTap } = props;

  const { addRecord } = useRecords();

  const [isRecordModalOpened, setIsRecordModalOpened] = useState(false);

  const handleAddSubmit = async (record: FormValue) => {
    await addRecord({ ...record, date });
    setIsRecordModalOpened(false);
  };

  const dateString = date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={onMaskTap}>
      <Dialog.Content
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <Dialog.Title align="center">Записи</Dialog.Title>
        <Dialog.Description align="center">{dateString}</Dialog.Description>
        <Records dayRecords={records} />
        <RecordModal
          isOpen={isRecordModalOpened}
          onSubmit={handleAddSubmit}
          onCancel={() => setIsRecordModalOpened(false)}
        />
        <Flex justify="between" mt="4">
          <Button size="4" onClick={onMaskTap} variant="outline">
            Закрыть
          </Button>
          <Button size="4" onClick={() => setIsRecordModalOpened(true)}>
            Добавить
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
