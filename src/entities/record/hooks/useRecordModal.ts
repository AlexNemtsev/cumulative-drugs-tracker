import { useState } from 'react';

import type { DoseRecord } from '@/shared/types/DoseRecord';

type AsyncActions = {
  addRecord?: (record: Omit<DoseRecord, 'id'>) => Promise<void>;
  editRecord?: (record: Required<DoseRecord>) => Promise<void>;
};

export const useRecordModal = (actions: AsyncActions) => {
  const { addRecord, editRecord } = actions;

  const [recordToChange, setRecordToChange] = useState<Required<DoseRecord>>();
  const [isRecordModalOpened, setIsRecordModalOpened] = useState(false);

  const openRecordModal = () => {
    setIsRecordModalOpened(true);
  };

  const closeRecordModal = () => {
    setRecordToChange(undefined);
    setIsRecordModalOpened(false);
  };

  const openRecordModalToEdit = (record: Required<DoseRecord>) => {
    setRecordToChange(record);
    setIsRecordModalOpened(true);
  };

  const handleRecord = async (record: DoseRecord) => {
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
