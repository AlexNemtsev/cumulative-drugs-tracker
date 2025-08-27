import { TabNav } from '@radix-ui/themes';

import { NavLink } from './NavLink';

export const Navigation = () => (
  <TabNav.Root justify="center">
    <NavLink route="/" key="/">
      Домой
    </NavLink>
    <NavLink route="/log" key="/log">
      Журнал
    </NavLink>
  </TabNav.Root>
);
