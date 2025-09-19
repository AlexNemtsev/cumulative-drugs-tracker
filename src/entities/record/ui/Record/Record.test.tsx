import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { openDB, type IDBPDatabase } from 'idb';

import { withProviders } from '@/app/providers';
import type { DoseRecord } from '@/shared/types/DoseRecord';
import { settings } from 'tests/mocks/settings';

import { Record } from './Record';

const testRecord: Required<DoseRecord> = {
  date: new Date('2025-06-07'),
  time: '09:21',
  targetDose: '20',
  dose: '10',
  id: 1,
};

const RecordWithProviders = withProviders(Record);

const setup = () => render(<RecordWithProviders record={testRecord} />);

const openContextMenu = () => {
  setup();
  const content = screen.getByTestId('record-content');
  fireEvent.contextMenu(content);
};

describe('Record', () => {
  it('Отрисовывается', async () => {
    setup();

    const recordContent = await screen.findByTestId('record-content');

    expect(recordContent).toBeInTheDocument();
  });

  it('открывается контекстное меню', async () => {
    openContextMenu();

    const editButton = await screen.findByRole('menuitem', { name: /изменить/i });
    const deleteButton = await screen.findByRole('menuitem', { name: /удалить/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});

describe('Record интеграционные тесты', () => {
  let mockDb: IDBPDatabase<unknown>;
  const targetDose = '20';

  beforeEach(async () => {
    mockDb = await openDB('doses');
    localStorage.setItem('settings', JSON.stringify({ ...settings, dayTarget: targetDose }));
  });

  it('открывается модальное окно редактирования', async () => {
    openContextMenu();

    const editButton = await screen.findByRole('menuitem', { name: /изменить/i });
    fireEvent.click(editButton);

    const title = await screen.findAllByText(/изменить запись/i);

    expect(title[0]).toBeInTheDocument();
    expect(title).toHaveLength(2);
  });

  it('сохраняет изменения и закрывает модальное окно', async () => {
    openContextMenu();

    const testDBRecord = {
      id: 1,
      datetime: '2025-06-07T09:21',
      dose: '10',
      targetDose,
    };

    const editButton = await screen.findByRole('menuitem', { name: /изменить/i });
    fireEvent.click(editButton);

    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockDb.put).toHaveBeenCalledWith('records', testDBRecord);
      expect(screen.queryByText(/изменить запись/i)).toBeNull();
    });
  });

  it('удаляет запись', async () => {
    openContextMenu();

    const deleteButton = await screen.findByRole('menuitem', { name: /удалить/i });
    fireEvent.click(deleteButton);

    const warning = await screen.findByText(/точно удалить запись/i);
    expect(warning).toBeInTheDocument();
    const confirmButton = await screen.findByRole('button', { name: /да/i });

    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDb.delete).toHaveBeenCalledWith('records', 1);
      expect(screen.queryByText(/точно удалить запись/i)).toBeNull();
    });
  });
});
