import { style, globalStyle } from '@vanilla-extract/css';

export const inputField = style({
  backgroundColor: 'white',
});

globalStyle(`${inputField} > input:disabled`, {
  backgroundColor: 'var(--indigo-3)',
});

export const text = style({
  paddingLeft: 12,
});
