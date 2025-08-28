import { createContext } from 'react';

import type { Settings } from '@/shared/types/Settings';

type SettingsContext = {
  settings: Settings | null;
  updateSettings: (settings: Settings) => void;
};

export const SettingsContext = createContext<SettingsContext | undefined>(undefined);
