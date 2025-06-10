import { act, renderHook, screen, waitFor } from '@testing-library/react';
import { openDB, type IDBPDatabase } from 'idb';
import type { ReactNode } from 'react';
import type { MockInstance } from 'vitest';

import type { RecordType } from '@/shared/types/Record';
import { records } from 'tests/mocks/records';

import { useRecords } from './useRecords';
import { ErrorDialogProvider } from '../ErrorDialogProvider';
import { RecordsProvider } from './RecordsProvider';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ErrorDialogProvider>
    <RecordsProvider>{children}</RecordsProvider>
  </ErrorDialogProvider>
);

let mockDb: IDBPDatabase<unknown>;

beforeEach(async () => {
  mockDb = await openDB('doses');
});

const testRecord: Required<RecordType> = {
  datetime: '2025-06-07T09:21',
  targetDose: '16',
  dose: '16',
  id: 1,
};

const testError = 'test error';

describe('Хук useRecords', () => {
  it('Возвращает все записи из бд', async () => {
    const { result } = renderHook(useRecords, { wrapper: Wrapper });

    await waitFor(() => {
      expect(mockDb.getAll).toHaveBeenCalledWith('records');
      expect(result.current.records).toEqual(records);
    });
  });

  it('addRecord вызывает метод add с правильными аргументами', async () => {
    const {
      result: {
        current: { addRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      addRecord(testRecord);
    });

    await waitFor(() => {
      expect(mockDb.add).toHaveBeenCalledWith('records', testRecord);
    });
  });

  it('updateRecord вызывает метод put с правильными аргументами', async () => {
    const {
      result: {
        current: { updateRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      updateRecord(testRecord);
    });

    await waitFor(() => {
      expect(mockDb.put).toHaveBeenCalledWith('records', testRecord);
    });
  });

  it('deleteRecord вызывает метод delete с правильными аргументами', async () => {
    const {
      result: {
        current: { deleteRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      deleteRecord(1);
    });

    await waitFor(() => {
      expect(mockDb.delete).toHaveBeenCalledWith('records', 1);
    });
  });

  it('Должно отобразиться сообщение, при ошибке чтения бд', async () => {
    (mockDb.getAll as unknown as MockInstance).mockRejectedValueOnce(new Error(testError));

    renderHook(useRecords, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText(testError)).toBeInTheDocument();
    });
  });

  it('Должно отобразиться сообщение по-умолчанию, при ошибке чтения бд, если ошибка не типа Error', async () => {
    (mockDb.getAll as unknown as MockInstance).mockRejectedValueOnce(1);

    renderHook(useRecords, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Ошибка при загрузке записей')).toBeInTheDocument();
    });
  });

  it('Должно отобразиться сообщение, при ошибке записи в бд', async () => {
    (mockDb.add as unknown as MockInstance).mockRejectedValueOnce(new Error(testError));

    const {
      result: {
        current: { addRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      addRecord(testRecord);
    });

    await waitFor(() => {
      expect(screen.getByText(testError)).toBeInTheDocument();
    });
  });

  it('Должно отобразиться сообщение по-умолчанию, при ошибке записи в бд, если ошибка не типа Error', async () => {
    (mockDb.add as unknown as MockInstance).mockRejectedValueOnce(1);

    const {
      result: {
        current: { addRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      addRecord(testRecord);
    });

    await waitFor(() => {
      expect(screen.getByText('Ошибка при сохранении записи')).toBeInTheDocument();
    });
  });

  it('Должно отобразиться сообщение, при ошибке обновления записи в бд', async () => {
    (mockDb.put as unknown as MockInstance).mockRejectedValueOnce(new Error(testError));

    const {
      result: {
        current: { updateRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      updateRecord(testRecord);
    });

    await waitFor(() => {
      expect(screen.getByText(testError)).toBeInTheDocument();
    });
  });

  it('Должно отобразиться сообщение по-умолчанию, при ошибке обновления записи в бд, если ошибка не типа Error', async () => {
    (mockDb.put as unknown as MockInstance).mockRejectedValueOnce(1);

    const {
      result: {
        current: { updateRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      updateRecord(testRecord);
    });

    await waitFor(() => {
      expect(screen.getByText('Ошибка при редактировании записи')).toBeInTheDocument();
    });
  });

  it('Должно отобразиться сообщение, при ошибке удаления записи в бд', async () => {
    (mockDb.delete as unknown as MockInstance).mockRejectedValueOnce(new Error(testError));

    const {
      result: {
        current: { deleteRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      deleteRecord(1);
    });

    await waitFor(() => {
      expect(screen.getByText(testError)).toBeInTheDocument();
    });
  });

  it('Должно отобразиться сообщение по-умолчанию, при ошибке удаления записи в бд, если ошибка не типа Error', async () => {
    (mockDb.delete as unknown as MockInstance).mockRejectedValueOnce(1);

    const {
      result: {
        current: { deleteRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      deleteRecord(1);
    });

    await waitFor(() => {
      expect(screen.getByText('Ошибка при удалении записи')).toBeInTheDocument();
    });
  });

  it('должен выбросить ошибку, если контекст не задан', () => {
    expect(() => renderHook(useRecords)).toThrowError(
      'useRecords must be used within RecordsProvider'
    );
  });
});
