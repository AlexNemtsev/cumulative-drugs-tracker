import { Flex, Box } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { registerSW } from 'virtual:pwa-register';
import { useLocation } from 'wouter';

import { container } from './App.css';
import { Navigation } from './ui/Navigation';
import { Router } from './ui/Router';

registerSW({ immediate: true });

export const App = () => {
  const [location] = useLocation();

  return (
    <Box height="100dvh" p="5" width="100dvw" className={container}>
      <Flex direction="column" gap="2" justify="between" height="100%">
        <Router />
        {location !== '/settings' && <Navigation />}
      </Flex>
    </Box>
  );
};
