import { ContextMenu } from '@radix-ui/themes';
import { useState } from 'react';

import type { RecordType } from '@/shared/types/Record';

import { RecordModal } from '../RecordModal';
import { Content } from './Content';

type Props = {
  record: Required<RecordType>;
};

export const Record = (props: Props) => {
  const { record } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Content record={record} />
        </ContextMenu.Trigger>
        <ContextMenu.Content size="2">
          <ContextMenu.Item onSelect={() => setIsModalOpen(true)}>Изменить</ContextMenu.Item>
          <ContextMenu.Item>Удалить</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <RecordModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Изменить запись"
        type="edit"
        record={record}
      />
    </>
  );
};
