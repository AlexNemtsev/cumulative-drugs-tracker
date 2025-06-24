import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { type IDBPDatabase, openDB } from 'idb';
import type { MockInstance } from 'vitest';

import { withProviders } from '@/app/providers';
import { records } from 'tests/mocks/records';

import { Records } from './Records';

const RecordsWithProviders = withProviders(Records);

let mockDb: IDBPDatabase<unknown>;

beforeEach(async () => {
  mockDb = await openDB('doses');
});

describe('Компонент Records', () => {
  it('должен отрисовать заглушку, если нет записей', async () => {
    (mockDb.getAll as unknown as MockInstance).mockResolvedValueOnce([]);

    render(<RecordsWithProviders />);

    const stub = await screen.findByText(/записей нет/i);

    expect(stub).toBeInTheDocument();
  });

  it('должен отрисовать список с записями', async () => {
    render(<RecordsWithProviders />);

    const elements = await screen.findAllByText(/мг/);

    expect(elements).toHaveLength(records.length);
    expect(elements[0]).toHaveTextContent(records[0].dose);
  });

  it('при нажатии изменить в контекстном меню открывает модалку RecordModal', async () => {
    render(<RecordsWithProviders />);

    const elements = await screen.findAllByText(/мг/);
    fireEvent.contextMenu(elements[0]);

    const editButton = screen.getByRole('menuitem', { name: /изменить/i });
    fireEvent.click(editButton);

    const modal = screen.getByRole('dialog', {
      name: /изменить запись/i,
    });

    expect(modal).toBeInTheDocument();
  });

  it('при нажатии удалить в контекстном меню открывает DeleteDialog', async () => {
    render(<RecordsWithProviders />);

    const elements = await screen.findAllByText(/мг/);
    fireEvent.contextMenu(elements[0]);

    const deleteButton = screen.getByRole('menuitem', { name: /удалить/i });
    fireEvent.click(deleteButton);

    const dialog = screen.getByRole('alertdialog', {
      name: /удалить запись/i,
    });
    expect(dialog).toBeInTheDocument();

    const confirmButton = screen.getByRole('button', {
      name: /да/i,
    });

    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDb.delete).toHaveBeenCalledWith('records', records[0].id);
    });
  });
});
