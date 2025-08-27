import { Flex, ScrollArea, Text } from '@radix-ui/themes';

import { useRecordModal } from '@/entities/record/hooks/useRecordModal';
import { Record } from '@/entities/record/ui/Record/Record';
import { RecordModal } from '@/entities/record/ui/RecordModal';
import { useRecords } from '@/shared/providers/RecordsProvider';
import { useSettings } from '@/shared/providers/SettingsProvider';
import { AddButton } from '@/shared/ui/AddButton';

import { DeleteDialog, useDeleteDialog } from './DeleteDialog';
import { recordsClass } from './Records.css';

export const Records = () => {
  const { records, deleteRecord, updateRecord, addRecord } = useRecords();
  const { settings } = useSettings();
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
    <Flex direction="column" gap="5">
      {records.length ? (
        <ScrollArea type="scroll" className={recordsClass}>
          {records.map((record) => (
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
        dayTargetDose={settings?.dayTarget ?? '0'}
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
