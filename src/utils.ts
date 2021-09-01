export function remove<T>(arr: T[], item: T) {
  const idx = arr.indexOf(item);
  if (idx === -1) {
    return arr;
  }
  const copy = [...arr];
  copy.splice(idx, 1);
  return copy;
}

export function addOrRemove<T>(arr: T[], item: T) {
  const idx = arr.indexOf(item);
  if (idx === -1) {
    return [...arr, item];
  }
  const copy = [...arr];
  copy.splice(idx, 1);
  return copy;
}
