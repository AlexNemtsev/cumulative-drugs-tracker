import type { FC } from 'react';

import { Home } from '@/pages/HomePage';
import { Log } from '@/pages/Log';
// import { Settings } from '@/pages/Settings';

type Route = {
  route: string;
  component: FC;
  title: string;
};

export const routes: Route[] = [
  {
    route: '/',
    component: Home,
    title: 'Домой',
  },
  {
    route: '/log',
    component: Log,
    title: 'Журнал',
  },
  // {
  //   route: '/settings',
  //   component: Settings,
  //   title: 'Настройки',
  // },
] as const;
