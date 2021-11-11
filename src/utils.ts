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

export function combinations<T>(arr: T[], r: number): T[][] {
  const combinations: T[][] = [];

  const n = arr.length;

  const data: T[] = [];

  const combinationUtil = (
    arr: T[],
    data: T[],
    start: number,
    end: number,
    index: number,
    r: number,
  ) => {
    if (index === r) {
      combinations.push([...data]);
      return;
    }

    let i = start;
    while (i <= end && end - i + 1 >= r - index) {
      data[index] = arr[i];
      combinationUtil(arr, data, i + 1, end, index + 1, r);
      ++i;
    }
  };

  combinationUtil(arr, data, 0, n - 1, 0, r);

  return combinations;
}
