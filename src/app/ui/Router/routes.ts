import type { FC } from 'react';

import { Home } from '@/pages/HomePage';
import { Log } from '@/pages/Log';
import { Settings } from '@/pages/Settings';

type Route = {
  route: string;
  component: FC;
};

export const routes: Route[] = [
  {
    route: '/',
    component: Home,
  },
  {
    route: '/log',
    component: Log,
  },
  {
    route: '/settings',
    component: Settings,
  },
] as const;
