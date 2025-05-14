import { useContext } from 'react';

import { RecordsContext } from './RecordsContext';

export const useRecords = () => {
  const context = useContext(RecordsContext);

  if (!context) {
    throw new Error('useRecords must be used within RecordsProvider');
  }

  return context;
};
