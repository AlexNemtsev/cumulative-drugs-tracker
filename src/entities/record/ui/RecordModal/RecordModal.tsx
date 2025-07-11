import { Dialog } from '@radix-ui/themes';

import { AppSettings } from '@/shared/appSettings';
import { toDateTimeLocal } from '@/shared/lib/toDateTimeLocal';
import type { RecordType } from '@/shared/types/Record';

import { RecordForm } from '../RecordForm';

export type RecordModalProps = {
  isOpen?: boolean;
  onSubmit: (record: RecordType) => void;
  onCancel: () => void;
  record?: RecordType;
};

export const RecordModal = (props: RecordModalProps) => {
  const { isOpen, record, onSubmit, onCancel } = props;

  const handleSubmit = (newRecord: Omit<RecordType, 'id' | 'targetDose'>) => {
    onSubmit({ ...newRecord, targetDose: AppSettings.DAY_TARGET });
  };

  const defaultRecord: RecordType = {
    dose: AppSettings.DEFAULT_DOSE,
    targetDose: AppSettings.DAY_TARGET,
    datetime: toDateTimeLocal(new Date()),
  };

  const formValue = record ?? defaultRecord;
  const title = record ? 'Изменить запись' : 'Создать запись';
  const description = record
    ? 'Изменить запись о приёме лекарства'
    : 'Создать запись о приёме лекарства';

  return (
    isOpen && (
      <Dialog.Root open={isOpen}>
        <Dialog.Content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <RecordForm onSubmit={handleSubmit} formValue={formValue} onCancel={onCancel} />
        </Dialog.Content>
      </Dialog.Root>
    )
  );
};
