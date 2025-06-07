import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppWithProviders } from './app';
import { migrateDatabase } from './shared/providers/RecordsProvider/lib/indexeddb';

await migrateDatabase();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>
);
