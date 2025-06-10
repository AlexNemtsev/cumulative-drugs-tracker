import { act, fireEvent, renderHook, screen, waitFor } from '@testing-library/react';

import { ErrorDialogProvider } from './ErrorDialogProvider';
import { useErrorDialog } from './useErrorDialog';

describe('Хук useErrorDialog', () => {
  it('отрисовывает модальное окно с предоставленым сообщением об ошибке', () => {
    const { result } = renderHook(useErrorDialog, { wrapper: ErrorDialogProvider });
    const message = 'тестовое сообщение об ошибке';

    act(() => {
      result.current.showError(message);
    });

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('отрисовывает модальное окно с сообщением по-умолчанию, если сообщение не передано', () => {
    const { result } = renderHook(useErrorDialog, { wrapper: ErrorDialogProvider });

    act(() => {
      result.current.showError();
    });

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Произошла неизвестная ошибка')).toBeInTheDocument();
  });

  it('-> кнопка "Закрыть" должна закрывать диалоговое окно', async () => {
    const { result } = renderHook(useErrorDialog, { wrapper: ErrorDialogProvider });

    act(() => {
      result.current.showError();
    });

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /закрыть/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(dialog).not.toBeInTheDocument();
    });
  });

  it('должен выбросить ошибку, если хук вызван вне провайдера', () => {
    expect(() => renderHook(useErrorDialog)).toThrowError(
      'useErrorDialog must be used within ErrorDialogProvider'
    );
  });
});
