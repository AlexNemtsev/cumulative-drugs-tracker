import { style } from '@vanilla-extract/css';

export const svg = style({
  display: 'block',
});

export const container = style({
  position: 'relative',
  display: 'inline-block',
});

export const content = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

export const progressFill = style({
  fill: 'var(--accent-5)',
});
