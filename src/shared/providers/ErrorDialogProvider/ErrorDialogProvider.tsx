import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useCallback, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';

import { ErrorDialogContext } from './ErrorDialogContext';

type ErrorDialogProviderProps = {
  children: ReactNode;
};

export const ErrorDialogProvider: FC<ErrorDialogProviderProps> = ({ children }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = useCallback((message?: string) => {
    setErrorMessage(message ?? null);
    setAlertOpen(true);
  }, []);

  const value = useMemo(() => ({ showError }), []);

  return (
    <ErrorDialogContext.Provider value={value}>
      {children}
      <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialog.Content>
          <AlertDialog.Title>Ошибка</AlertDialog.Title>
          <AlertDialog.Description>
            {errorMessage || 'Произошла неизвестная ошибка'}
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button size="4" onClick={() => setAlertOpen(false)}>
                Закрыть
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </ErrorDialogContext.Provider>
  );
};
