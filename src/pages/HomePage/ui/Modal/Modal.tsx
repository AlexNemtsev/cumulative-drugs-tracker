import { Dialog } from '@radix-ui/themes';

import { Records } from '@/features/records';
import type { DoseRecord } from '@/shared/types/DoseRecord';

type Props = {
  isOpen: boolean;
  records: Required<DoseRecord>[];
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

  return (
    <Dialog.Root open={isOpen} onOpenChange={onMaskTap}>
      <Dialog.Content
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <Dialog.Title align="center">Записи</Dialog.Title>
        <Dialog.Description align="center">{dateString}</Dialog.Description>
        <Records dayRecords={records} date={date} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
