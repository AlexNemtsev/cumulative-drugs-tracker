import { TabNav } from '@radix-ui/themes';

import { NavLink } from './NavLink';
import { routes } from '../../routes';

export const Navigation = () => (
  <TabNav.Root justify="center">
    {routes.map((route) => (
      <NavLink route={route.route} key={route.route}>
        {route.title}
      </NavLink>
    ))}
  </TabNav.Root>
);
