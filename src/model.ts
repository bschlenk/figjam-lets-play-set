import { AttrColor, AttrCount, AttrShade, AttrShape } from './attributes';

export type ICard = number;
export type IDeck = number[];

export function createCard(
  count: AttrCount,
  color: AttrColor,
  shape: AttrShape,
  shade: AttrShade,
) {
  return count | (color << 2) | (shape << 4) | (shade << 6);
}

export function extractCardAttributes(card: ICard) {
  const count: AttrCount = card & 0b11;
  card >>>= 2;
  const color: AttrColor = card & 0b11;
  card >>>= 2;
  const shape: AttrShape = card & 0b11;
  card >>>= 2;
  const shade: AttrShade = card & 0b11;
  return [count, color, shape, shade] as const;
}

export function createDeck() {
  const deck: IDeck = [];
  const nums = [0, 1, 2];

  for (let count of nums) {
    for (let color of nums) {
      for (let shape of nums) {
        for (let shade of nums) {
          deck.push(createCard(count, color, shape, shade));
        }
      }
    }
  }

  return shuffle(deck);
}

/**
 * Return whether this is a valid set. A valid set is
 * one that conforms to the rules of set.
 * @return Whether this set is valid.
 */
export function isSet(cards: ICard[]): boolean {
  if (cards.length !== 3) {
    return false;
  }
  const attributes = zip(cards.map((card) => extractCardAttributes(card)));
  return attributes.every(allSameOrAllDifferent);
}

function allSameOrAllDifferent(values: any[]): boolean {
  const uniqueCount = new Set(values).size;
  return uniqueCount === 1 || uniqueCount === values.length;
}

/**
 * Zip all the arrays together, like python's zip method.
 * Assumes all the arrays are of the same size.
 * @param values The values to zip.
 */
function zip<T>(values: ReadonlyArray<T>[]): T[][] {
  const length = values[0].length;
  const zipped = [];
  for (let i = 0; i < length; ++i) {
    const row = values.map((v) => v[i]);
    zipped.push(row);
  }
  return zipped;
}

function shuffle(deck: IDeck): IDeck {
  deck = [...deck];
  const newDeck: IDeck = [];

  while (deck.length) {
    const idx = Math.floor(Math.random() * deck.length);
    newDeck.push(deck.splice(idx, 1)[0]);
  }

  return newDeck;
}
