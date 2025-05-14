import { Theme, Flex, Box } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';
import './index.css';
import { Log } from '@/pages/Log';
import { ErrorDialogProvider } from '@/shared/providers/ErrorDialogProvider';
import { RecordsProvider } from '@/shared/providers/RecordsProvider';

import styles from './App.module.css';

export const App = () => (
  <Theme radius="full" accentColor="crimson">
    <ErrorDialogProvider>
      <RecordsProvider>
        <Box height="100dvh" p="5" width="100dvw" className={styles.appContainer}>
          <Flex direction="column" gap="2" justify="between" height="100%">
            <Log />
          </Flex>
        </Box>
      </RecordsProvider>
    </ErrorDialogProvider>
  </Theme>
);
