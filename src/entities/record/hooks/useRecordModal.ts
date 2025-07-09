import { useState } from 'react';

import type { RecordType } from '@/shared/types/Record';

type AsyncActions = {
  addRecord?: (record: Omit<RecordType, 'id'>) => Promise<void>;
  editRecord?: (record: Required<RecordType>) => Promise<void>;
};

export const useRecordModal = (actions: AsyncActions) => {
  const { addRecord, editRecord } = actions;

  const [recordToChange, setRecordToChange] = useState<Required<RecordType>>();
  const [isRecordModalOpened, setIsRecordModalOpened] = useState(false);

  const openRecordModal = () => {
    setIsRecordModalOpened(true);
  };

  const closeRecordModal = () => {
    setRecordToChange(undefined);
    setIsRecordModalOpened(false);
  };

  const openRecordModalToEdit = (record: Required<RecordType>) => {
    setRecordToChange(record);
    setIsRecordModalOpened(true);
  };

  const handleRecord = async (record: RecordType) => {
    if (recordToChange && editRecord) {
      await editRecord({ ...record, id: recordToChange.id });
    } else if (!recordToChange && addRecord) {
      await addRecord(record);
    }

    closeRecordModal();
  };

  return {
    recordToChange,
    isRecordModalOpened,
    openRecordModal,
    closeRecordModal,
    openRecordModalToEdit,
    handleRecord,
  };
};
