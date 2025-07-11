import { act, renderHook, waitFor } from '@testing-library/react';

import { testRecord } from 'tests/mocks/testRecord';

import { useRecordModal } from './useRecordModal';

const addRecord = vi.fn();
const editRecord = vi.fn();

const updatedRecord = {
  datetime: '2025-06-07T09:21',
  targetDose: '24',
  dose: '20',
  id: 2,
};

describe('Хук useRecordModals', () => {
  it('должен вернуть значения по-умолчанию при инициализации', () => {
    const { result } = renderHook(() => useRecordModal({ addRecord, editRecord }));

    expect(result.current.recordToChange).toBeUndefined();
    expect(result.current.isRecordModalOpened).toBe(false);
  });

  it('openRecordModal переводит isRecordModalOpened в true', async () => {
    const { result } = renderHook(() => useRecordModal({ addRecord, editRecord }));

    act(() => {
      result.current.openRecordModal();
    });

    await waitFor(() => {
      expect(result.current.isRecordModalOpened).toBe(true);
    });
  });

  it('openRecordModalToEdit переводит isRecordModalOpened в true и устанавливает recordToChange', async () => {
    const { result } = renderHook(() => useRecordModal({ addRecord, editRecord }));

    act(() => {
      result.current.openRecordModalToEdit(testRecord);
    });

    await waitFor(() => {
      expect(result.current.isRecordModalOpened).toBe(true);
      expect(result.current.recordToChange).toBe(testRecord);
    });
  });

  it('closeRecordModal переводит isRecordModalOpened в false и сбрасывает recordToChange', async () => {
    const { result } = renderHook(() => useRecordModal({ addRecord, editRecord }));

    act(() => {
      result.current.openRecordModalToEdit(testRecord);
    });

    act(() => {
      result.current.closeRecordModal();
    });

    await waitFor(() => {
      expect(result.current.isRecordModalOpened).toBe(false);
      expect(result.current.recordToChange).toBeUndefined();
    });
  });

  it('handleRecord должна вызвать editRecord, если editRecord задана и recordToChange установлена', async () => {
    const { result } = renderHook(() => useRecordModal({ addRecord, editRecord }));

    act(() => {
      result.current.openRecordModalToEdit(testRecord);
    });

    act(() => {
      result.current.handleRecord(updatedRecord);
    });

    await waitFor(() => {
      expect(editRecord).toHaveBeenCalledWith({ ...updatedRecord, id: testRecord.id });
      expect(addRecord).not.toHaveBeenCalled();
      expect(result.current.isRecordModalOpened).toBe(false);
      expect(result.current.recordToChange).toBeUndefined();
    });
  });

  it('handleRecord должна вызвать addRecord, если addRecord задана и не задана recordToChange', async () => {
    const { result } = renderHook(() => useRecordModal({ addRecord, editRecord }));

    act(() => {
      result.current.handleRecord(updatedRecord);
    });

    await waitFor(() => {
      expect(addRecord).toHaveBeenCalledWith(updatedRecord);
      expect(editRecord).not.toHaveBeenCalled();
      expect(result.current.isRecordModalOpened).toBe(false);
      expect(result.current.recordToChange).toBeUndefined();
    });
  });

  it('handleRecord должна вызвать closeRecordModal, если async actions не заданы', async () => {
    const { result } = renderHook(() => useRecordModal({}));

    act(() => {
      result.current.handleRecord(updatedRecord);
    });

    await waitFor(() => {
      expect(editRecord).not.toHaveBeenCalled();
      expect(addRecord).not.toHaveBeenCalled();
      expect(result.current.isRecordModalOpened).toBe(false);
      expect(result.current.recordToChange).toBeUndefined();
    });
  });
});
