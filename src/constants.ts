// Cards have an aspect ratio of 8 / 11.5
export const CARD_WIDTH = 120;
export const CARD_HEIGHT = 168;
export const CARD_ROWS = 3;

export const COLOR_RED = '#FD001A';
export const COLOR_GREEN = '#00CC3F';
export const COLOR_PURPLE = '#A142F5';

/* The time one has to point out set. */
export const SELECTING_SECONDS = 5;

export const SPACING = 16;

export const COLOR_PRIMARY = '#52b6ff';
export const CARD_SHADOW: WidgetJSX.Effect = {
  type: 'drop-shadow',
  offset: { x: 0, y: 2 },
  blur: 6,
  color: { r: 0, g: 0, b: 0, a: 0.25 },
};

export const enum Variant {
  Active = '#52b6ff', // Primary
  Success = '#00CC3F', // Green
  Failure = '#FD001A', // Red
}
