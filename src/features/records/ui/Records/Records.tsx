import { ScrollArea, Text } from '@radix-ui/themes';
import { useState } from 'react';

import { Record } from '@/entities/record/ui/Record/Record';
import { RecordModal } from '@/entities/record/ui/RecordModal';
import { useRecords } from '@/shared/providers/RecordsProvider';
import type { RecordType } from '@/shared/types/Record';

import { DeleteDialog } from './DeleteDialog';
import { recordsClass } from './Records.css';

export const Records = () => {
  const { records, deleteRecord } = useRecords();
  const [recordToChange, setRecordToChange] = useState<Required<RecordType>>();
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  const openEditModal = (record: Required<RecordType>) => {
    setRecordToChange(record);
    setIsEditModalOpened(true);
  };

  const openDeleteModal = (record: Required<RecordType>) => {
    setRecordToChange(record);
    setIsDeleteDialogOpened(true);
  };

  const handleDeleteRecord = async () => {
    if (recordToChange) {
      await deleteRecord(recordToChange.id);
    }

    setIsDeleteDialogOpened(false);
  };

  return records.length ? (
    <>
      <ScrollArea type="scroll" className={recordsClass}>
        {records.map((record) => (
          <Record
            key={record.id}
            record={record}
            onDelete={openDeleteModal}
            onEdit={openEditModal}
          />
        ))}
      </ScrollArea>
      {recordToChange && (
        <>
          <RecordModal
            isOpen={isEditModalOpened}
            onOpenChange={setIsEditModalOpened}
            type="edit"
            record={recordToChange}
          />
          <DeleteDialog
            onDelete={handleDeleteRecord}
            isOpen={isDeleteDialogOpened}
            onOpenChange={setIsDeleteDialogOpened}
          />
        </>
      )}
    </>
  ) : (
    <Text align="center" size="4">
      Записей нет
    </Text>
  );
};
