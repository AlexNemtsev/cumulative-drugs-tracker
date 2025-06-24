import { AlertDialog, Button, Flex } from '@radix-ui/themes';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

export const DeleteDialog = (props: Props) => {
  const { isOpen, onCancel, onDelete } = props;

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content>
        <AlertDialog.Title>Удалить запись</AlertDialog.Title>
        <AlertDialog.Description>
          Точно удалить запись? Эта операция необратима
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="outline" size="4" onClick={onCancel}>
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
