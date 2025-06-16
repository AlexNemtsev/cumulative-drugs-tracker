import { Flex, Box } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

import { useRecords } from '@/shared/providers/RecordsProvider';

import { container } from './App.css';
import { Navigation } from './ui/Navigation';
import { Router } from './ui/Router';

registerSW({ immediate: true });

export const App = () => {
  const { loadRecords } = useRecords();

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <Box height="100dvh" p="5" width="100dvw" className={container}>
      <Flex direction="column" gap="2" justify="between" height="100%">
        <Router />
        <Navigation />
      </Flex>
    </Box>
  );
};
