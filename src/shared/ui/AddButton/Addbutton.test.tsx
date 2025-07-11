import { fireEvent, render, screen } from '@testing-library/react';

import { AddButton } from './AddButton';

const onClick = vi.fn();

test('Кнопка AddButton должна отрисоваться', () => {
  render(<AddButton onClick={onClick} />);

  const addButton = screen.getByRole('button', {
    name: /добавить запись/i,
  });

  fireEvent.click(addButton);

  expect(addButton).toMatchSnapshot();
  expect(onClick).toBeCalled();
});
