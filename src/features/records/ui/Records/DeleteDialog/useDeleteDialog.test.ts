import { act, renderHook, waitFor } from '@testing-library/react';

import { useDeleteDialog } from './useDeleteDialog';

const deleteRecord = vi.fn();
const recordId = 6;

describe('Хук useDeleteDialog', () => {
  it('должен вернуть значения по-умолчанию при инициализации', () => {
    const { result } = renderHook(() => useDeleteDialog(deleteRecord));

    expect(result.current.recordIdToDelete).toBeUndefined();
    expect(result.current.isDeleteDialogOpened).toBe(false);
  });

  it('openDeleteModal переводит isDeleteDialogOpened в true и устанавливает recordIdToDelete', () => {
    const { result } = renderHook(() => useDeleteDialog(deleteRecord));

    act(() => {
      result.current.openDeleteModal(recordId);
    });

    expect(result.current.isDeleteDialogOpened).toBe(true);
    expect(result.current.recordIdToDelete).toBe(recordId);
  });

  it('closeDeleteModal переводит isDeleteDialogOpened в false и сбрасывает recordIdToDelete', () => {
    const { result } = renderHook(() => useDeleteDialog(deleteRecord));

    act(() => {
      result.current.openDeleteModal(recordId);
    });

    act(() => {
      result.current.closeDeleteModal();
    });

    expect(result.current.recordIdToDelete).toBeUndefined();
    expect(result.current.isDeleteDialogOpened).toBe(false);
  });

  it('handleDeleteRecord должна вызвать deleteRecord, если deleteRecord и recordIdToDelete заданы', async () => {
    const { result } = renderHook(() => useDeleteDialog(deleteRecord));

    act(() => {
      result.current.openDeleteModal(recordId);
    });

    act(() => {
      result.current.handleDeleteRecord();
    });

    await waitFor(() => {
      expect(result.current.recordIdToDelete).toBeUndefined();
      expect(result.current.isDeleteDialogOpened).toBe(false);
      expect(deleteRecord).toHaveBeenCalledWith(recordId);
    });
  });

  it('handleDeleteRecord должна закрыть модальное окно, если recordIdToDelete не задана', async () => {
    const { result } = renderHook(() => useDeleteDialog(deleteRecord));

    act(() => {
      result.current.handleDeleteRecord();
    });

    await waitFor(() => {
      expect(deleteRecord).not.toHaveBeenCalled();
    });
  });
});
