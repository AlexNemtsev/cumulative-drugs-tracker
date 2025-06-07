import type { FC } from 'react';

import { RecordsProvider } from '@/shared/providers/RecordsProvider';

export const withRecordsProvider = (Component: FC) => () => (
  <RecordsProvider>
    <Component />
  </RecordsProvider>
);
