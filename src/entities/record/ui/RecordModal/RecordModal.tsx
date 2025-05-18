import { Dialog } from '@radix-ui/themes';

import { toDateTimeLocal } from '@/shared/lib/toDateTimeLocal';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { RecordType } from '@/shared/types/Record';

import { RecordForm } from '../RecordForm';

type Props = {
  isOpen?: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
};

export const RecordModal = (props: Props) => {
  const { isOpen, onOpenChange, title } = props;
  const { addRecord } = useRecords();

  const handleSubmit = async (record: RecordType) => {
    await addRecord(record);
    onOpenChange(false);
  };

  const formValue: RecordType = {
    dose: '16',
    datetime: toDateTimeLocal(new Date()),
  };

  return (
    isOpen && (
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <Dialog.Title>{title}</Dialog.Title>
          <RecordForm onSubmit={handleSubmit} formValue={formValue} />
        </Dialog.Content>
      </Dialog.Root>
    )
  );
};
