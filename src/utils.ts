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

export function byChunks<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  let chunk: T[] = [];

  for (const el of arr) {
    chunk.push(el);
    if (chunk.length === size) {
      chunks.push(chunk);
      chunk = [];
    }
  }

  if (chunk.length) {
    chunks.push(chunk);
  }

  return chunks;
}
