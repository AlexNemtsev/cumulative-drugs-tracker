import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { openDB, type IDBPDatabase } from 'idb';

import { withProviders } from '@/app/providers';
import { AppSettings } from '@/shared/appSettings';
import { toDateTimeLocal } from '@/shared/lib/toDateTimeLocal';
import type { RecordType } from '@/shared/types/Record';

import { RecordModal, type RecordModalProps } from './RecordModal';

const handelOpenChange = vi.fn();

const testRecord: Required<RecordType> = {
  id: 6,
  dose: '16',
  targetDose: AppSettings.DAY_TARGET.toString(),
  datetime: '2025-06-11T15:48',
};

const setup = (props?: Pick<RecordModalProps, 'type' | 'record'>) => {
  const ModalWithProviders = withProviders(RecordModal);

  const { type = 'edit', record } = props ?? {};

  return type === 'edit'
    ? render(
        <ModalWithProviders isOpen onOpenChange={handelOpenChange} type="edit" record={record!} />
      )
    : render(<ModalWithProviders isOpen onOpenChange={handelOpenChange} type="add" />);
};

describe('RecordModal', () => {
  let mockDb: IDBPDatabase<unknown>;

  beforeEach(async () => {
    mockDb = await openDB('doses');
    vi.useFakeTimers({ toFake: ['Date'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('должна отрисоваться', () => {
    setup();

    const modal = screen.getByRole('dialog', {
      name: /изменить запись/i,
    });
    const description = screen.getByText(/изменить запись о приёме лекарства/i);
    const datetime = screen.getByLabelText(/время:/i);
    const doseSelector = screen.getByRole('combobox');
    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });
    const cancelButton = screen.getByRole('button', {
      name: /отмена/i,
    });

    expect(modal).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(datetime).toBeInTheDocument();
    expect(doseSelector).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('в режиме edit должна заполнять форму переданными данными', async () => {
    setup({ record: testRecord, type: 'edit' });

    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockDb.put).toHaveBeenCalledWith('records', testRecord);
      expect(handelOpenChange).toHaveBeenCalled();
    });
  });

  it('в режиме add должна заполнять форму данными по-умолчанию', async () => {
    const defaultRecord: RecordType = {
      dose: AppSettings.DEFAULT_DOSE,
      targetDose: AppSettings.DAY_TARGET,
      datetime: toDateTimeLocal(new Date()),
    };

    setup({ type: 'add' });

    const modal = screen.getByRole('dialog', {
      name: /создать запись/i,
    });
    const description = screen.getByText(/создать запись о приёме лекарства/i);

    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });

    expect(modal).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockDb.add).toHaveBeenCalledWith('records', defaultRecord);
      expect(handelOpenChange).toHaveBeenCalled();
    });
  });

  it('при отмене модальное окно должно закрыться без побочных эффектов', () => {
    setup();

    const cancelButton = screen.getByRole('button', {
      name: /отмена/i,
    });
    fireEvent.click(cancelButton);

    expect(mockDb.add).not.toHaveBeenCalled();
    expect(mockDb.put).not.toHaveBeenCalled();
    expect(handelOpenChange).toHaveBeenCalled();
  });
});
