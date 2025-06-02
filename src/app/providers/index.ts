import type { FC, JSX } from 'react';

import { withErrorDialogProvider } from './withErrorDialogProvider';
import { withRecordsProvider } from './withRecordsProvider';
import { withThemeProvider } from './withThemeProvider';

type ProviderHOC = (Component: FC) => () => JSX.Element;

const compose =
  (...fns: ProviderHOC[]) =>
  (initialVal: FC) =>
    fns.reduceRight((val, fn) => fn(val), initialVal);

export const withProviders = compose(
  withThemeProvider,
  withErrorDialogProvider,
  withRecordsProvider,
);
