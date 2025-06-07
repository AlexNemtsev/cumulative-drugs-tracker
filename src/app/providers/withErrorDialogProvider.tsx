import type { FC } from 'react';

import { ErrorDialogProvider } from '@/shared/providers/ErrorDialogProvider';

export const withErrorDialogProvider = (Component: FC) => () => (
  <ErrorDialogProvider>
    <Component />
  </ErrorDialogProvider>
);
