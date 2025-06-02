import { TabNav } from '@radix-ui/themes';
import { Link, useLocation } from 'wouter';

import { link } from './Navigation.css';

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <TabNav.Root justify="center">
      <TabNav.Link asChild active={location === '/'} className={link}>
        <Link href="/">Домой</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={location === '/log'} className={link}>
        <Link href="/log">Журнал</Link>
      </TabNav.Link>
      {/* <TabNav.Link asChild active={location === '/settings'} className={link}>
        <Link href="/settings">Настройки</Link>
      </TabNav.Link> */}
    </TabNav.Root>
  );
};
