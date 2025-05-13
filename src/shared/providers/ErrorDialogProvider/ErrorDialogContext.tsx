import { createContext } from 'react';

type ErrorDialogContextType = {
  showError: (message?: string) => void;
};

export const ErrorDialogContext = createContext<ErrorDialogContextType | undefined>(undefined);
