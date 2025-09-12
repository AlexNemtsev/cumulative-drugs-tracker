import { Dialog } from '@radix-ui/themes';

import { Records } from '@/features/records';
import { toDateTimeLocal } from '@/shared/lib/toDateTimeLocal';
import type { RecordType } from '@/shared/types/Record';

type Props = {
  isOpen: boolean;
  records: Required<RecordType>[];
  date: Date;
  onMaskTap: () => void;
};

export const Modal = (props: Props) => {
  const { isOpen, date, records, onMaskTap } = props;

  const dateString = date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dateShort = toDateTimeLocal(date).split('T')[0];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onMaskTap}>
      <Dialog.Content
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <Dialog.Title align="center">Записи</Dialog.Title>
        <Dialog.Description align="center">{dateString}</Dialog.Description>
        <Records dayRecords={records} dateShort={dateShort} />
        {/* <AddButton onClick={openRecordModal} />
        <RecordModal isOpen={isRecordModalOpened} onClose={closeRecordModal} date={dateShort} /> */}
      </Dialog.Content>
    </Dialog.Root>
  );
};
