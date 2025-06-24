import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DeleteDialog } from './DeleteDialog';

const handleChange = vi.fn();
const handleDelete = vi.fn();

const setup = () =>
  render(<DeleteDialog isOpen onOpenChange={handleChange} onDelete={handleDelete} />);

describe('DeleteDialog', () => {
  it('должен отрисоваться', () => {
    setup();

    const dialog = screen.getByRole('alertdialog', {
      name: /удалить запись/i,
    });
    const description = screen.getByText(/точно удалить запись\? эта операция необратима/i);
    const confirmButton = screen.getByRole('button', {
      name: /да/i,
    });
    const cancelButton = screen.getByRole('button', {
      name: /нет/i,
    });

    expect(dialog).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('должен удалить запись при нажатии на Да', async () => {
    setup();

    const confirmButton = screen.getByRole('button', {
      name: /да/i,
    });

    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(handleChange).toBeCalledWith(false);
      expect(handleDelete).toBeCalled();
    });
  });

  it('должен закрыть модальное окно без побочных эффектов при нажатии на Нет', async () => {
    setup();

    const cancelButton = screen.getByRole('button', {
      name: /нет/i,
    });

    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(handleDelete).not.toHaveBeenCalled();
      expect(handleChange).toBeCalledWith(false);
    });
  });
});
