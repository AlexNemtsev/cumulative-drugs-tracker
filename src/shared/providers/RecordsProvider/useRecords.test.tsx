import { act, renderHook, screen, waitFor } from '@testing-library/react';
import { openDB, type IDBPDatabase } from 'idb';
import type { ReactNode } from 'react';
import type { MockInstance } from 'vitest';

import { withProviders } from '@/app/providers';
import type { DoseRecord } from '@/shared/types/DoseRecord';
import { records } from 'tests/mocks/records';
import { settings } from 'tests/mocks/settings';

import type { DBRecord } from './lib/DBController';
import { useRecords } from './useRecords';

const WrapperComponent = ({ children }: { children: ReactNode }) => <>{children}</>;
const WrapperComponentWithProviders = withProviders(WrapperComponent);

const Wrapper = ({ children }: { children: ReactNode }) => (
  <WrapperComponentWithProviders>{children}</WrapperComponentWithProviders>
);

let mockDb: IDBPDatabase<unknown>;

const targetDose = '16';

const testDBRecord: Required<DBRecord> = {
  id: 1,
  datetime: '2025-06-07T09:21',
  dose: '16',
  targetDose,
};

const testDoseRecord: Required<DoseRecord> = {
  id: testDBRecord.id,
  dose: testDBRecord.dose,
  targetDose: testDBRecord.targetDose,
  date: new Date(testDBRecord.datetime),
  time: testDBRecord.datetime.split('T')[1],
};

beforeEach(async () => {
  mockDb = await openDB('doses');
  localStorage.setItem('settings', JSON.stringify({ ...settings, dayTarget: targetDose }));
});

const testError = 'test error';

const mappedRecords = records.map((record) => ({
  id: record.id,
  date: new Date(record.datetime),
  time: record.datetime.split('T')[1],
  dose: record.dose,
  targetDose: record.targetDose,
}));

describe('Хук useRecords', () => {
  it('Возвращает все записи из бд', async () => {
    const { result } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      result.current.loadRecords();
    });

    await waitFor(() => {
      expect(mockDb.getAll).toHaveBeenCalledWith('records');
      expect(result.current.records).toEqual(mappedRecords);
    });
  });

  it('addRecord вызывает метод add с правильными аргументами', async () => {
    const {
      result: {
        current: { addRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    const { id, ...omittedRecord } = testDBRecord;

    act(() => {
      addRecord(testDoseRecord);
    });

    await waitFor(() => {
      expect(mockDb.add).toHaveBeenCalledWith('records', omittedRecord);
    });
  });

  it('updateRecord вызывает метод put с правильными аргументами', async () => {
    const {
      result: {
        current: { updateRecord },
      },
    } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      updateRecord(testDoseRecord);
    });

    await waitFor(() => {
      expect(mockDb.put).toHaveBeenCalledWith('records', testDBRecord);
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

    const { result } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      result.current.loadRecords();
    });

    await waitFor(() => {
      expect(screen.getByText(testError)).toBeInTheDocument();
    });
  });

  it('Должно отобразиться сообщение по-умолчанию, при ошибке чтения бд, если ошибка не типа Error', async () => {
    (mockDb.getAll as unknown as MockInstance).mockRejectedValueOnce(1);

    const { result } = renderHook(useRecords, { wrapper: Wrapper });

    act(() => {
      result.current.loadRecords();
    });

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
      addRecord(testDoseRecord);
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
      addRecord(testDoseRecord);
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
      updateRecord(testDoseRecord);
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
      updateRecord(testDoseRecord);
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
