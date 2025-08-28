import { useEffect } from 'react';
import { useLocation } from 'wouter';

import { useSettings } from '@/shared/providers/SettingsProvider';

import { routes } from './routes';

const locations = new Set(routes.map(({ route }) => route));

export const useRedirects = () => {
  const [location, navigate] = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    if (!locations.has(location)) {
      navigate('/');
    }

    if (!settings && import.meta.env.MODE !== 'development') {
      navigate('/settings');
    }
  }, [location, settings]);
};
