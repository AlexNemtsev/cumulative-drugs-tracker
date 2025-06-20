import { Dialog } from '@radix-ui/themes';

import { AppSettings } from '@/shared/appSettings';
import { toDateTimeLocal } from '@/shared/lib/toDateTimeLocal';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { RecordType } from '@/shared/types/Record';

import { RecordForm } from '../RecordForm';

type OnOpenHandler = (isOpen: boolean) => void;

type RecordModalAddProps = {
  isOpen?: boolean;
  onOpenChange: OnOpenHandler;
  type: 'add';
  record?: never;
};

type RecordModalEditProps = {
  isOpen?: boolean;
  onOpenChange: OnOpenHandler;
  type: 'edit';
  record: Required<RecordType>;
};

export type RecordModalProps = RecordModalAddProps | RecordModalEditProps;

export const RecordModal = (props: RecordModalProps) => {
  const { isOpen, onOpenChange, type, record } = props;
  const { addRecord, updateRecord } = useRecords();

  const handleCloseModal = () => onOpenChange(false);

  const handleUpdate = async (updatedRecord: Omit<RecordType, 'id'>) => {
    await updateRecord({ id: record!.id, ...updatedRecord });
  };

  const handleFunction = type === 'add' ? addRecord : handleUpdate;

  const handleSubmit = async (newRecord: Omit<RecordType, 'id' | 'targetDose'>) => {
    await handleFunction({ ...newRecord, targetDose: AppSettings.DAY_TARGET });
    handleCloseModal();
  };

  const defaultRecord: RecordType = {
    dose: AppSettings.DEFAULT_DOSE,
    targetDose: AppSettings.DAY_TARGET,
    datetime: toDateTimeLocal(new Date()),
  };

  const formValue: RecordType = type === 'edit' ? record : defaultRecord;
  const title = type === 'edit' ? 'Изменить запись' : 'Создать запись';
  const description =
    type === 'edit' ? 'Изменить запись о приёме лекарства' : 'Создать запись о приёме лекарства';

  return (
    isOpen && (
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <RecordForm onSubmit={handleSubmit} formValue={formValue} onCancel={handleCloseModal} />
        </Dialog.Content>
      </Dialog.Root>
    )
  );
};
