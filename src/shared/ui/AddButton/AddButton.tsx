import { Button } from '@radix-ui/themes';

import { PlusIcon } from '@/shared/assets/icons/PlusIcon';

type Props = {
  onClick?: () => void;
};

export const AddButton = (props: Props) => {
  const { onClick } = props;

  return (
    <Button size="4" onClick={onClick} aria-label="Добавить запись">
      <PlusIcon />
    </Button>
  );
};
