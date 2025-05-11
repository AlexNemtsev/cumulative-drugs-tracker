import { Theme, Flex, Box, TabNav } from '@radix-ui/themes';
import './index.css';
import { Link, Route, Switch, useLocation } from 'wouter';

import { Home } from '@/pages/HomePage';
import { Log } from '@/pages/Log';
import { Settings } from '@/pages/Settings';

export const App = () => {
  const [location] = useLocation();

  return (
    <Theme radius="full" accentColor="crimson">
      <Box height="100dvh" p="5" width="100dvw">
        <Flex direction="column" gap="2" justify="between" height="100%">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/log" component={Log} />
            <Route path="/settings" component={Settings} />
          </Switch>
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
        </Flex>
      </Box>
    </Theme>
  );
};
