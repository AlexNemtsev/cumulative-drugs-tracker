import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { SettingsController } from '@/shared/providers/SettingsProvider/lib/SettingsController';
import type { Settings } from '@/shared/types/Settings';

import { SettingsContext } from './SettingsContext';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings | null>(null);

  const getSettings = useCallback(() => {
    const lsSettings = SettingsController.getSettings();
    setSettings(lsSettings);
  }, []);

  const updateSettings = useCallback((updatedSettings: Settings) => {
    SettingsController.setSettings(updatedSettings);
    getSettings();
  }, []);

  const value = useMemo(
    () => ({
      settings,
      updateSettings,
    }),
    [settings]
  );

  useEffect(() => {
    getSettings();
  }, []);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
