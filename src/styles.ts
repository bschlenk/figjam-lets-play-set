export const COLOR_PRIMARY = '#52b6ff';

export function padding(...values: number[]) {
  const top = values[0];
  let right = values[0];
  let bottom = values[0];
  let left = values[0];

  if (values.length >= 2) {
    // Two-value case: top and bottom values are the same; right and left values are the same.
    // Values are listed as [top/bottom, right/left].
    right = values[1];
    left = values[1];
  }

  if (values.length >= 3) {
    // Three-value case: values are listed as [top, right/left, bottom].
    bottom = values[2];
  }

  if (values.length >= 4) {
    // Four-value case: all values are different and listed as [top, right, bottom, left].
    left = values[3];
  }

  return { left, top, right, bottom };
}
