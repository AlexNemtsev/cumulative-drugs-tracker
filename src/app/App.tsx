import { Theme, Flex, Box } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';
import './index.css';
import { Navigation } from './ui/Navigation';
import { Router } from './ui/Router';

export const App = () => (
  <Theme radius="full" accentColor="crimson">
    <Box height="100dvh" p="5" width="100dvw">
      <Flex direction="column" gap="2" justify="between" height="100%">
        <Router />
        <Navigation />
      </Flex>
    </Box>
  </Theme>
);
