import { style } from '@vanilla-extract/css';

import { container } from '@/shared/styles/container.css';

export const progressBar = style({
  height: 25,
});

export const card = style([
  container,
  {
    padding: 16,
    vars: {
      '--card-border-width': '0',
    },
  },
]);
