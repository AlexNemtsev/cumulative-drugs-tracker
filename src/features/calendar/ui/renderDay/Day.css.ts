import { styleVariants } from '@vanilla-extract/css';

export const dayOfWeek = styleVariants({
  weekend: {
    color: 'var(--accent-11)',
  },
  weekday: {
    color: '#000',
  },
});
