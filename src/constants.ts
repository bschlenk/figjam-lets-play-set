export const BOARD_COLUMNS = 4;
export const BOARD_ROWS = 3;
export const CARD_ASPECT_RATIO = 8 / 11.5;
export const BACKGROUND_COLOR = '#333';
export const CARD_COLOR = '#EEE';
export const CARD_RADIUS = 20;

export const TOTAL_CARDS = Math.pow(BOARD_ROWS, BOARD_COLUMNS);

export const COLOR_RED = '#FD001A';
export const COLOR_GREEN = '#00CC3F';
export const COLOR_PURPLE = '#A142F5';

/* The time one has to point out set. */
export const SELECTING_SECONDS = 5;

export const COLOR_PRIMARY = '#52b6ff';
export const CARD_SHADOW: WidgetJSX.Effect = {
  type: 'drop-shadow',
  offset: { x: 0, y: 2 },
  blur: 6,
  color: { r: 0, g: 0, b: 0, a: 0.25 },
};
