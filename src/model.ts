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
  const count: AttrCount = (card >>> 0) & 0b11;
  const color: AttrColor = (card >>> 2) & 0b11;
  const shape: AttrShape = (card >>> 4) & 0b11;
  const shade: AttrShade = (card >>> 6) & 0b11;
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
 * Draw the given number of cards from the deck, returning
 * the drawn cards and the new deck with the drawn cards removed.
 * @param deck The deck to draw from.
 * @param numCards The number of cards to draw.
 * @return A tuple of drawn cards, new deck.
 */
export function drawCards<T>(deck: T[], numCards: number) {
  const drawn = deck.slice(0, numCards);
  const newDeck = deck.slice(numCards);
  return [drawn, newDeck];
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
