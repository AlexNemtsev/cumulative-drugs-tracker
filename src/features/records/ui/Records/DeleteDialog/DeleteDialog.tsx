import { AlertDialog, Button, Flex } from '@radix-ui/themes';

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpened: boolean) => void;
  onDelete: () => void;
};

export const DeleteDialog = (props: Props) => {
  const { isOpen, onOpenChange, onDelete } = props;

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
            <Button variant="outline" size="4" onClick={handleCloseDialog}>
              Нет
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button size="4" onClick={onDelete}>
              Да
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
