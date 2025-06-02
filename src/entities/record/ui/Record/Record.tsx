import { ContextMenu, Flex, Separator } from '@radix-ui/themes';
import { useState } from 'react';

import type { RecordType } from '@/shared/types/Record';

import { RecordModal } from '../RecordModal';
import { Content } from './Content';
import { DeleteDialog } from './DeleteDialog';
import { contextMenuOption } from './Record.css';

type Props = {
  record: Required<RecordType>;
};

export const Record = (props: Props) => {
  const { record } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  const onEditHandler = () => setIsModalOpen(true);
  const onDeleteHandler = () => setIsDeleteDialogOpened(true);

  return (
    <>
      <ContextMenu.Root>
        <Content record={record} />
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
      <RecordModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Изменить запись"
        type="edit"
        record={record}
      />
      <DeleteDialog
        recordId={record.id}
        isOpen={isDeleteDialogOpened}
        onOpenChange={setIsDeleteDialogOpened}
      />
    </>
  );
};
