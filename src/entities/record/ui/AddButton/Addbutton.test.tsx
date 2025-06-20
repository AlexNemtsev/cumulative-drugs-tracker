import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@/app/providers';

import { AddButton } from './AddButton';

const ButtonWithProviders = withProviders(AddButton);

test('Кнопка AddButton должна открыть модальное окно на создание записи при нажатии', async () => {
  render(<ButtonWithProviders />);

  const saveButton = screen.getByRole('button', {
    name: /добавить запись/i,
  });

  fireEvent.click(saveButton);

  const modal = await screen.findByRole('dialog', {
    name: /создать запись/i,
  });
  const description = await screen.findByText(/создать запись о приёме лекарства/i);

  expect(modal).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});
