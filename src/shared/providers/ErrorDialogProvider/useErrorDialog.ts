import { useContext } from 'react';

import { ErrorDialogContext } from './ErrorDialogContext';

export const useErrorDialog = () => {
  const context = useContext(ErrorDialogContext);

  if (!context) {
    throw new Error('useErrorDialog must be used within ErrorDialogProvider');
  }

  return context;
};
