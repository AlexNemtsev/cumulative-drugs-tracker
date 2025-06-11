import { RecordsProvider } from '@/shared/providers/RecordsProvider';

import type { WithProviderHOC } from './WithProviderHOC';

export const withRecordsProvider: WithProviderHOC = (Component) => (props) => (
  <RecordsProvider>
    <Component {...props} />
  </RecordsProvider>
);
