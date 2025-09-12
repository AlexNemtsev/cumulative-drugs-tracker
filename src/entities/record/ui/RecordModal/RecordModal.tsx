import { Dialog } from '@radix-ui/themes';

import { AppSettings } from '@/shared/appSettings';
import { useSettings } from '@/shared/providers/SettingsProvider';
import type { RecordType } from '@/shared/types/Record';

import { RecordForm, type FormValue } from '../RecordForm';
import { form } from './RecordModal.css';

export type RecordModalProps = {
  isOpen?: boolean;
  onSubmit: (record: RecordType) => void;
  onCancel: () => void;
  record?: RecordType;
  dateShort: string;
};

export const RecordModal = (props: RecordModalProps) => {
  const { isOpen, record, onSubmit, onCancel, dateShort } = props;

  const { settings } = useSettings();
  const dayTargetDose = settings?.dayTarget ?? '0';

  const handleSubmit = (newRecord: FormValue) => {
    onSubmit({
      dose: newRecord.dose,
      targetDose: dayTargetDose,
      datetime: `${dateShort}T${newRecord.time}`,
    });
  };

  const defaultRecord: FormValue = {
    dose: AppSettings.DEFAULT_DOSE,
    time: new Date().toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  };

  const formValue = record ? { ...record, time: record.datetime.split('T')[1] } : defaultRecord;
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
