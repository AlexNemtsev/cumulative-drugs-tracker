import { Theme } from '@radix-ui/themes';
import type { FC } from 'react';

export const withThemeProvider = (Component: FC) => () => (
  <Theme radius="full" accentColor="crimson">
    <Component />
  </Theme>
);
