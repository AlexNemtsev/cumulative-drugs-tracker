import { Dialog } from '@radix-ui/themes';

import { AppSettings } from '@/shared/appSettings';

import { RecordForm, type FormValue } from '../RecordForm';
import { getCurrentTime } from './getCurrentTime';
import { form } from './RecordModal.css';

export type RecordModalProps = {
  isOpen?: boolean;
  onSubmit: (record: FormValue) => void;
  onCancel: () => void;
  record?: FormValue;
};

export const RecordModal = (props: RecordModalProps) => {
  const { isOpen, record, onSubmit, onCancel } = props;

  const handleSubmit = (newRecord: FormValue) => {
    onSubmit(newRecord);
  };

  const defaultRecord: FormValue = {
    dose: AppSettings.DEFAULT_DOSE,
    time: getCurrentTime(),
  };

  const formValue = record ? { ...record, time: record.time } : defaultRecord;
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
          <RecordForm
            onSubmit={handleSubmit}
            formValue={formValue}
            onCancel={onCancel}
            className={form}
          />
        </Dialog.Content>
      </Dialog.Root>
    )
  );
};
