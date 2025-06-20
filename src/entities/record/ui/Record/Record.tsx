import { Box, ContextMenu, Flex, Separator } from '@radix-ui/themes';

import type { RecordType } from '@/shared/types/Record';

import { Content } from './Content';
import { contextMenuOption } from './Record.css';

type Props = {
  record: Required<RecordType>;
  onEdit: (record: Required<RecordType>) => void;
  onDelete: (record: Required<RecordType>) => void;
};

export const Record = (props: Props) => {
  const { record, onEdit, onDelete } = props;

  const onEditHandler = () => onEdit(record);
  const onDeleteHandler = () => onDelete(record);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box>
          <Content record={record} />
        </Box>
      </ContextMenu.Trigger>
      <ContextMenu.Content size="2">
        <Flex direction="column" gap="1">
          <ContextMenu.Item onSelect={onEditHandler} className={contextMenuOption}>
            Изменить
          </ContextMenu.Item>
          <Separator size="4" />
          <ContextMenu.Item onSelect={onDeleteHandler} className={contextMenuOption}>
            Удалить
          </ContextMenu.Item>
        </Flex>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
