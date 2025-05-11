import { TabNav } from '@radix-ui/themes';
import { Link, useLocation } from 'wouter';

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <TabNav.Root justify="center">
      <TabNav.Link asChild active={location === '/'}>
        <Link href="/">Домой</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={location === '/log'}>
        <Link href="/log">Журнал</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={location === '/settings'}>
        <Link href="/settings">Настройки</Link>
      </TabNav.Link>
    </TabNav.Root>
  );
};
