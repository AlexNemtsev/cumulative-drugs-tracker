import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { type IDBPDatabase, openDB } from 'idb';

import { withProviders } from '@/app/providers';

import { DeleteDialog } from './DeleteDialog';

const handleChange = vi.fn();

const DialogWithProviders = withProviders(DeleteDialog);

const setup = () => render(<DialogWithProviders isOpen recordId={6} onOpenChange={handleChange} />);

describe('DeleteDialog', () => {
  let mockDb: IDBPDatabase<unknown>;

  beforeEach(async () => {
    mockDb = await openDB('doses');
  });

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
      expect(mockDb.delete).toHaveBeenCalledWith('records', 6);
      expect(handleChange).toBeCalledWith(false);
    });
  });

  it('должен закрыть модальное окно без побочных эффектов при нажатии на Нет', async () => {
    setup();

    const cancelButton = screen.getByRole('button', {
      name: /нет/i,
    });

    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockDb.delete).not.toHaveBeenCalled();
      expect(handleChange).toBeCalledWith(false);
    });
  });
});
