import { ErrorDialogProvider } from '@/shared/providers/ErrorDialogProvider';

import type { WithProviderHOC } from './WithProviderHOC';

export const withErrorDialogProvider: WithProviderHOC = (Component) => (props) => (
  <ErrorDialogProvider>
    <Component {...props} />
  </ErrorDialogProvider>
);
