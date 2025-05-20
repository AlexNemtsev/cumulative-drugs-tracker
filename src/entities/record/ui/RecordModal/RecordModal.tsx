import { Dialog } from '@radix-ui/themes';

import { toDateTimeLocal } from '@/shared/lib/toDateTimeLocal';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { RecordType } from '@/shared/types/Record';

import { RecordForm } from '../RecordForm';

type Props = {
  isOpen?: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  type: 'add' | 'edit';
  record?: Required<RecordType>;
};

const defaultRecord = {
  dose: '16',
  datetime: toDateTimeLocal(new Date()),
};

export const RecordModal = (props: Props) => {
  const { isOpen, onOpenChange, title, type, record } = props;
  const { addRecord, updateRecord } = useRecords();

  const handleUpdate = async (updatedRecord: Omit<RecordType, 'id'>) => {
    if (record) {
      await updateRecord({ id: record?.id, ...updatedRecord });
    }
  };

  const handleFunction = type === 'add' ? addRecord : handleUpdate;

  const handleSubmit = async (newRecord: Omit<RecordType, 'id'>) => {
    await handleFunction(newRecord);
    onOpenChange(false);
  };

  const formValue: RecordType = type === 'edit' && record ? record : defaultRecord;

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
