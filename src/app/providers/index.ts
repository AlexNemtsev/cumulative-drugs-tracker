import type { ComponentType } from 'react';

import { withErrorDialogProvider } from './withErrorDialogProvider';
import type { WithProviderHOC } from './WithProviderHOC';
import { withRecordsProvider } from './withRecordsProvider';
import { withThemeProvider } from './withThemeProvider';

const compose =
  (...hocs: WithProviderHOC[]) =>
  <P extends Record<string, unknown>>(Component: ComponentType<P>): ComponentType<P> =>
    hocs.reduceRight((acc, hoc) => hoc(acc), Component);

export const withProviders = compose(
  withThemeProvider,
  withErrorDialogProvider,
  withRecordsProvider
);
