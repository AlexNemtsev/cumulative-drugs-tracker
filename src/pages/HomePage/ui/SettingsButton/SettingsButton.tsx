import { IconButton } from '@radix-ui/themes';
import { useLocation } from 'wouter';

import { GearIcon } from '@/shared/assets/icons/GearIcon';

import { button } from './SettingsButton.css';

export const SettingsButton = () => {
  const [_, navigate] = useLocation();

  return (
    <IconButton
      variant="ghost"
      color="gray"
      className={button}
      onClick={() => navigate('/settings')}
    >
      <GearIcon />
    </IconButton>
  );
};
