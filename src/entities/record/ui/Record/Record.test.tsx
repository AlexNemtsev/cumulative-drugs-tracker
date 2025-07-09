import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@/app/providers';
import type { RecordType } from '@/shared/types/Record';

import { Record } from './Record';

const testRecord: Required<RecordType> = {
  datetime: '2025-06-07T09:21',
  targetDose: '16',
  dose: '16',
  id: 1,
};

const handleEdit = vi.fn();
const handleDelete = vi.fn();

const RecordWithProviders = withProviders(Record);

const setup = () =>
  render(<RecordWithProviders record={testRecord} onDelete={handleDelete} onEdit={handleEdit} />);

describe('Record', () => {
  it('Должен отрисоваться', async () => {
    setup();

    const recordContent = screen.getByTestId('record-content');

    expect(recordContent).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /изменить/i })).toBeNull();
    expect(screen.queryByRole('menuitem', { name: /удалить/i })).toBeNull();

    fireEvent.contextMenu(recordContent);

    const editButton = await screen.findByRole('menuitem', { name: /изменить/i });
    const deleteButton = await screen.findByRole('menuitem', { name: /удалить/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it('Должен вызваться onEdit при нажатии на Изменить', async () => {
    setup();

    const recordContent = screen.getByTestId('record-content');
    fireEvent.contextMenu(recordContent);

    const editButton = await screen.findByRole('menuitem', { name: /изменить/i });
    fireEvent.click(editButton);

    expect(handleEdit).toBeCalledWith(testRecord);
  });

  it('Должен вызваться onDelete при нажатии на Удалить', async () => {
    setup();

    const recordContent = screen.getByTestId('record-content');
    fireEvent.contextMenu(recordContent);

    const deleteButton = await screen.findByRole('menuitem', { name: /удалить/i });
    fireEvent.click(deleteButton);

    expect(handleDelete).toBeCalledWith(testRecord.id);
  });
});
