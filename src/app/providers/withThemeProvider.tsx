import { Theme } from '@radix-ui/themes';

import type { WithProviderHOC } from './WithProviderHOC';

export const withThemeProvider: WithProviderHOC = (Component) => (props) => (
  <Theme radius="full" accentColor="crimson">
    <Component {...props} />
  </Theme>
);
