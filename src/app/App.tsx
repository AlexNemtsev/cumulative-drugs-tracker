import { Theme, Flex, Box } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';
import './index.css';
import { ErrorDialogProvider } from '@/shared/providers/ErrorDialogProvider';
import { RecordsProvider } from '@/shared/providers/RecordsProvider';

import styles from './App.module.css';
import { Navigation } from './ui/Navigation';
import { Router } from './ui/Router';

export const App = () => (
  <Theme radius="full" accentColor="crimson">
    <ErrorDialogProvider>
      <RecordsProvider>
        <Box height="100dvh" p="5" width="100dvw" className={styles.appContainer}>
          <Flex direction="column" gap="2" justify="between" height="100%">
            <Router />
            <Navigation />
          </Flex>
        </Box>
      </RecordsProvider>
    </ErrorDialogProvider>
  </Theme>
);
