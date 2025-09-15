import { Box, ContextMenu, Flex, Separator } from '@radix-ui/themes';

import type { DoseRecord } from '@/shared/types/DoseRecord';

import { Content } from './Content';
import { contextMenuOption } from './Record.css';

type Props = {
  record: Required<DoseRecord>;
  onEdit: (record: Required<DoseRecord>) => void;
  onDelete: (recordId: number) => void;
};

export const Record = (props: Props) => {
  const { record, onEdit, onDelete } = props;

  const onEditHandler = () => onEdit(record);
  const onDeleteHandler = () => onDelete(record.id);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box>
          <Content time={record.time} dose={record.dose} />
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
