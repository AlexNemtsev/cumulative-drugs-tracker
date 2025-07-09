import { useState } from 'react';

export const useDeleteDialog = (deleteRecord?: (recordId: number) => Promise<void>) => {
  const [recordIdToDelete, setRecordIdToDelete] = useState<number>();
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  const openDeleteModal = (recordId: number) => {
    setRecordIdToDelete(recordId);
    setIsDeleteDialogOpened(true);
  };

  const closeDeleteModal = () => {
    setRecordIdToDelete(undefined);
    setIsDeleteDialogOpened(false);
  };

  const handleDeleteRecord = async () => {
    if (recordIdToDelete && deleteRecord) {
      await deleteRecord(recordIdToDelete);
    }

    closeDeleteModal();
  };

  return {
    openDeleteModal,
    closeDeleteModal,
    handleDeleteRecord,
    isDeleteDialogOpened,
    recordIdToDelete,
  };
};
