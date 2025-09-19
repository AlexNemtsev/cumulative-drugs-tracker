import { Flex, Separator, ContextMenu as Menu } from '@radix-ui/themes';

import { contextMenuOption } from './ContextMenu.css';

type Props = {
  onChangeSelect: () => void;
  onDeleteSelect: () => void;
};

export const ContextMenu = (props: Props) => {
  const { onChangeSelect, onDeleteSelect } = props;

  return (
    <Menu.Content size="2">
      <Flex direction="column" gap="1">
        <Menu.Item onSelect={onChangeSelect} className={contextMenuOption}>
          Изменить
        </Menu.Item>
        <Separator size="4" />
        <Menu.Item onSelect={onDeleteSelect} className={contextMenuOption}>
          Удалить
        </Menu.Item>
      </Flex>
    </Menu.Content>
  );
};
