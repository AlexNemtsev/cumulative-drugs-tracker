import type { ComponentType } from 'react';

export type WithProviderHOC = <P extends Record<string, unknown>>(
  Component: ComponentType<P>
) => ComponentType<P>;
