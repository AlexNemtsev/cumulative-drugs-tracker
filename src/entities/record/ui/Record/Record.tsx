import { ContextMenu } from '@radix-ui/themes';
import { useState } from 'react';

import type { RecordType } from '@/shared/types/Record';

import { RecordModal } from '../RecordModal';
import { Content } from './Content';
import { DeleteDialog } from './DeleteDialog';

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
          <ContextMenu.Item onSelect={onEditHandler}>Изменить</ContextMenu.Item>
          <ContextMenu.Item onSelect={onDeleteHandler}>Удалить</ContextMenu.Item>
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
