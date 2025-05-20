import { Button } from '@radix-ui/themes';
import { useState } from 'react';

import { PlusIcon } from '@/shared/assets/icons/PlusIcon';

import { RecordModal } from '../RecordModal';

export const AddButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button size="4" onClick={() => setIsModalOpen(true)}>
        <PlusIcon />
      </Button>
      <RecordModal
        type="add"
        title="Создать запись"
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};
