import { Flex, ScrollArea, Text } from '@radix-ui/themes';
import { useState } from 'react';

import { Record } from '@/entities/record/ui/Record/Record';
import { RecordModal } from '@/entities/record/ui/RecordModal';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { RecordType } from '@/shared/types/Record';
import { AddButton } from '@/shared/ui/AddButton';

import { DeleteDialog } from './DeleteDialog';
import { recordsClass } from './Records.css';

export const Records = () => {
  const { records, deleteRecord, updateRecord, addRecord } = useRecords();
  const [recordToChange, setRecordToChange] = useState<Required<RecordType>>();
  const [isRecordModalOpened, setIsRecordModalOpened] = useState(false);
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  // TODO: протестировать, что открытие и закрытие модалок не будет влиять на последующие операции

  const openRecordModal = () => {
    setIsRecordModalOpened(true);
  };

  const closeRecordModal = () => {
    setRecordToChange(undefined);
    setIsRecordModalOpened(false);
  };

  const openEditModalToEdit = (record: Required<RecordType>) => {
    setRecordToChange(record);
    setIsRecordModalOpened(true);
  };

  const openDeleteModal = (record: Required<RecordType>) => {
    setRecordToChange(record);
    setIsDeleteDialogOpened(true);
  };

  const closeDeleteModal = () => {
    setRecordToChange(undefined);
    setIsDeleteDialogOpened(false);
  };

  const handleRecord = async (record: RecordType) => {
    if (recordToChange) {
      await updateRecord({ ...record, id: recordToChange.id });
    } else {
      await addRecord(record);
    }

    closeRecordModal();
  };

  const handleDeleteRecord = async () => {
    if (recordToChange) {
      await deleteRecord(recordToChange.id);
    }

    closeDeleteModal();
  };

  return (
    <Flex direction="column" gap="5">
      {records.length ? (
        <ScrollArea type="scroll" className={recordsClass}>
          {records.map((record) => (
            <Record
              key={record.id}
              record={record}
              onDelete={openDeleteModal}
              onEdit={openEditModalToEdit}
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
