import { style } from '@vanilla-extract/css';

export const selectContent = style({
  borderRadius: 20,
});

export const selectItem = style([selectContent]);

export const selectTrigger = style({
  width: '140px',
});
