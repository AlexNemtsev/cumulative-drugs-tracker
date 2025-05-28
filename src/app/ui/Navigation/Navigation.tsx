import { TabNav } from '@radix-ui/themes';
import { Link, useLocation } from 'wouter';

import styles from './Navigation.module.css';

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <TabNav.Root justify="center">
      <TabNav.Link asChild active={location === '/'} className={styles.link}>
        <Link href="/">Домой</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={location === '/log'} className={styles.link}>
        <Link href="/log">Журнал</Link>
      </TabNav.Link>
      {/* <TabNav.Link asChild active={location === '/settings'}>
        <Link href="/settings">Настройки</Link>
      </TabNav.Link> */}
    </TabNav.Root>
  );
};
