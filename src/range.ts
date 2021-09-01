export function range<T>(count: number, fn: (i: number) => T) {
  const items: T[] = [];
  for (let i = 0; i < count; ++i) {
    items.push(fn(i));
  }
  return items;
}
