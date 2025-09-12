import { Flex, ScrollArea, Text } from '@radix-ui/themes';

import { useRecordModal } from '@/entities/record/hooks/useRecordModal';
import { Record } from '@/entities/record/ui/Record/Record';
import { RecordModal } from '@/entities/record/ui/RecordModal';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { RecordType } from '@/shared/types/Record';
import { AddButton } from '@/shared/ui/AddButton';

import { DeleteDialog, useDeleteDialog } from './DeleteDialog';
import { recordsClass } from './Records.css';

type Props = {
  dayRecords: Required<RecordType>[];
  dateShort: string;
};

export const Records = (props: Props) => {
  const { dayRecords, dateShort } = props;

  const { deleteRecord, updateRecord, addRecord } = useRecords();
  const {
    closeRecordModal,
    handleRecord,
    isRecordModalOpened,
    openRecordModal,
    openRecordModalToEdit,
    recordToChange,
  } = useRecordModal({
    addRecord,
    editRecord: updateRecord,
  });

  const { closeDeleteModal, handleDeleteRecord, isDeleteDialogOpened, openDeleteModal } =
    useDeleteDialog(deleteRecord);

  return (
    <Flex direction="column" gap="5" mt="2">
      {dayRecords.length ? (
        <ScrollArea type="scroll" className={recordsClass}>
          {dayRecords.map((record) => (
            <Record
              key={record.id}
              record={record}
              onDelete={openDeleteModal}
              onEdit={openRecordModalToEdit}
            />
          ))}
        </ScrollArea>
      ) : (
        <Text align="center" size="4">
          Записей нет
        </Text>
      )}
      <RecordModal
        isOpen={isRecordModalOpened}
        onSubmit={handleRecord}
        onCancel={closeRecordModal}
        record={recordToChange}
        dateShort={dateShort}
      />
      <DeleteDialog
        onDelete={handleDeleteRecord}
        isOpen={isDeleteDialogOpened}
        onCancel={closeDeleteModal}
      />
      <AddButton onClick={openRecordModal} />
    </Flex>
  );
};
