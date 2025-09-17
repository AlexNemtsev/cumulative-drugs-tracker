import { Box, ContextMenu, Flex, Separator } from '@radix-ui/themes';
import { useState } from 'react';

import { DeleteDialog } from '@/entities/record/ui/DeleteDialog';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { DoseRecord } from '@/shared/types/DoseRecord';

import { Content } from './Content';
import { contextMenuOption } from './Record.css';
import { RecordModal } from '../RecordModal';

type Props = {
  record: Required<DoseRecord>;
};

export const Record = (props: Props) => {
  const { record } = props;

  const { updateRecord, deleteRecord } = useRecords();
  const [isRecordModalOpened, setIsRecordModalOpened] = useState(false);
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  const handleUpdateSubmit = async (updatedRecord: DoseRecord) => {
    await updateRecord({ ...updatedRecord, id: record.id });
    setIsRecordModalOpened(false);
  };

  const handleDeleteRecord = async () => {
    await deleteRecord(record.id);
    setIsDeleteDialogOpened(false);
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box>
          <Content time={record.time} dose={record.dose} />
        </Box>
      </ContextMenu.Trigger>
      <ContextMenu.Content size="2">
        <Flex direction="column" gap="1">
          <ContextMenu.Item
            onSelect={() => setIsRecordModalOpened(true)}
            className={contextMenuOption}
          >
            Изменить
          </ContextMenu.Item>
          <Separator size="4" />
          <ContextMenu.Item
            onSelect={() => setIsDeleteDialogOpened(true)}
            className={contextMenuOption}
          >
            Удалить
          </ContextMenu.Item>
        </Flex>
      </ContextMenu.Content>
      {isRecordModalOpened && (
        <RecordModal
          onSubmit={handleUpdateSubmit}
          onCancel={() => setIsRecordModalOpened(false)}
          isOpen={isRecordModalOpened}
          record={record}
          date={record.date}
        />
      )}
      {isDeleteDialogOpened && (
        <DeleteDialog
          onDelete={handleDeleteRecord}
          isOpen={isDeleteDialogOpened}
          onCancel={() => setIsDeleteDialogOpened(false)}
        />
      )}
    </ContextMenu.Root>
  );
};
