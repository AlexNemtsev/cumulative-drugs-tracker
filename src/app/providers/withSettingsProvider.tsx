import { SettingsProvider } from '@/shared/providers/SettingsProvider';

import type { WithProviderHOC } from './WithProviderHOC';

export const withSettingsProvider: WithProviderHOC = (Component) => (props) => (
  <SettingsProvider>
    <Component {...props} />
  </SettingsProvider>
);
