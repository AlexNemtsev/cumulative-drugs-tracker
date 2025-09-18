import { Box, ContextMenu as Menu } from '@radix-ui/themes';
import { render, screen, fireEvent } from '@testing-library/react';

import { withThemeProvider } from '@/app/providers/withThemeProvider';

import { ContextMenu } from './ContextMenu';

const onChange = vi.fn();
const onDelete = vi.fn();

const WrappedMenu = () => (
  <Menu.Root>
    <Menu.Trigger>
      <Box>Context</Box>
    </Menu.Trigger>
    <ContextMenu onChangeSelect={onChange} onDeleteSelect={onDelete} />
  </Menu.Root>
);

const MenuWithTheme = withThemeProvider(WrappedMenu);

const setup = () => render(<MenuWithTheme />);

describe('ContextMenu', () => {
  it('Вызывает onChangeSelect при нажатии на Изменить', () => {
    setup();
    const contextMenu = screen.getByText('Context');
    fireEvent.contextMenu(contextMenu);

    const editButton = screen.getByRole('menuitem', { name: /изменить/i });
    fireEvent.click(editButton);

    expect(onChange).toBeCalled();
  });

  it('Вызывает onDeleteSelect при нажатии на Удалить', () => {
    setup();
    const contextMenu = screen.getByText('Context');
    fireEvent.contextMenu(contextMenu);

    const deleteButton = screen.getByRole('menuitem', { name: /удалить/i });
    fireEvent.click(deleteButton);
  });
});
