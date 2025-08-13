import { useEffect } from 'react';
import { useLocation } from 'wouter';

import { SettingsController } from '@/shared/lib/SettingsController';

import { routes } from './routes';

const locations = new Set(routes.map(({ route }) => route));

export const useRedirects = () => {
  const [location, navigate] = useLocation();
  const settings = SettingsController.getSettings();

  useEffect(() => {
    if (!locations.has(location)) {
      navigate('/');
    }

    if (!settings) {
      navigate('/settings');
    }
  }, [location, settings]);
};
