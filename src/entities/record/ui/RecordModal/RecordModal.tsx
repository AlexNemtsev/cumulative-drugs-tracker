import { Dialog } from '@radix-ui/themes';

import { addRecord } from '@/shared/lib/indexeddb';
import { useErrorDialog } from '@/shared/providers/ErrorDialogProvider';
import type { RecordType } from '@/shared/types/Record';

import { RecordForm } from '../RecordForm';

type Props = {
  isOpen?: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
};

export const RecordModal = (props: Props) => {
  const { isOpen, onOpenChange, title } = props;
  const { showError } = useErrorDialog();

  const handleSubmit = async (record: RecordType) => {
    try {
      await addRecord(record);
      onOpenChange(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Ошибка при сохранении записи');
      }
    }
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
          <RecordForm onSubmit={handleSubmit} />
        </Dialog.Content>
      </Dialog.Root>
    )
  );
};
