import { AlertDialog, Button, Flex } from '@radix-ui/themes';

import { useRecords } from '@/shared/providers/RecordsProvider';

type Props = {
  recordId: number;
  isOpen: boolean;
  onOpenChange: (isOpened: boolean) => void;
};

export const DeleteDialog = (props: Props) => {
  const { isOpen, onOpenChange, recordId } = props;

  const { deleteRecord } = useRecords();

  const handleDelete = async () => {
    await deleteRecord(recordId);
    onOpenChange(false);
  };

  const handleCloseDialog = () => onOpenChange(false);

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content>
        <AlertDialog.Title>Удалить запись</AlertDialog.Title>
        <AlertDialog.Description>
          Точно удалить запись? Эта операция необратима
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button color="gray" size="4" onClick={handleCloseDialog}>
              Нет
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button size="4" onClick={handleDelete}>
              Да
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
