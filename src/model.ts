import { AttrColor, AttrCount, AttrShade, AttrShape } from './attributes';
import { allSameOrAllDifferent, zip } from './utils';

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

  return deck;
}

/**
 * Return whether this is a valid set. A set is 3 cards, where each attribute
 * (count, shape, color, shade) is either the same on all cards, or unique on
 * each card.
 */
export function isSet(cards: ICard[]): boolean {
  if (cards.length !== 3) {
    return false;
  }
  const attributes = zip(cards.map((card) => extractCardAttributes(card)));
  return attributes.every(allSameOrAllDifferent);
}

/**
 * Takes a deck and returns a new shuffled deck. The shuffling method is to
 * take one card at random from the given deck and place it in the new deck,
 * until there are no more cards to take.
 *
 * This feels more random than the swap method you typically find on stack
 * overflow. That one relies on X number of swaps, and always swaps one
 * card with another. The issue with that is, given X swaps, with 2 cards
 * chosen at random per swap, you statistically won't even shuffle every
 * card. I noticed this resulting in much more sets available at a time, due
 * likely to the predictable way the original deck is generated.
 */
export function shuffle(deck: IDeck): IDeck {
  deck = [...deck];
  const newDeck: IDeck = [];

  while (deck.length) {
    const idx = Math.floor(Math.random() * deck.length);
    newDeck.push(deck.splice(idx, 1)[0]);
  }

  return newDeck;
}
