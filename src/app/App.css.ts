import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('body', {
  margin: 0,
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
});

export const container = style({
  backgroundColor: 'var(--indigo-2)',
});
