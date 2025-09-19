import { Box, ContextMenu as Menu } from '@radix-ui/themes';
import { useState } from 'react';

import { DeleteDialog } from '@/entities/record/ui/DeleteDialog';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { DoseRecord } from '@/shared/types/DoseRecord';

import { Content } from './Content';
import { RecordModal } from '../RecordModal';
import { ContextMenu } from './ContextMenu';
import type { FormValue } from '../RecordForm';

type Props = {
  record: Required<DoseRecord>;
};

export const Record = (props: Props) => {
  const { record } = props;

  const { updateRecord, deleteRecord } = useRecords();
  const [isRecordModalOpened, setIsRecordModalOpened] = useState(false);
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  const handleUpdateSubmit = async (updatedRecord: FormValue) => {
    await updateRecord({ ...updatedRecord, id: record.id, date: record.date });
    setIsRecordModalOpened(false);
  };

  const handleDeleteRecord = async () => {
    await deleteRecord(record.id);
    setIsDeleteDialogOpened(false);
  };

  return (
    <Menu.Root>
      <Menu.Trigger>
        <Box>
          <Content time={record.time} dose={record.dose} />
        </Box>
      </Menu.Trigger>
      <ContextMenu
        onChangeSelect={() => setIsRecordModalOpened(true)}
        onDeleteSelect={() => setIsDeleteDialogOpened(true)}
      />
      {isRecordModalOpened && (
        <RecordModal
          onSubmit={handleUpdateSubmit}
          onCancel={() => setIsRecordModalOpened(false)}
          isOpen={isRecordModalOpened}
          record={record}
        />
      )}
      {isDeleteDialogOpened && (
        <DeleteDialog
          onDelete={handleDeleteRecord}
          isOpen={isDeleteDialogOpened}
          onCancel={() => setIsDeleteDialogOpened(false)}
        />
      )}
    </Menu.Root>
  );
};
