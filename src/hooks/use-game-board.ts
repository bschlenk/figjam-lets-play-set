import { createDeck, ICard, IDeck, isSet, shuffle } from '../model';
import { combinations } from '../utils';

const { useSyncedState, useEffect } = figma.widget;

const BOARD_SIZE = 12;

interface GameBoard {
  cards: ICard[];
  deckEmpty: () => boolean;
  replace: (cardsToReplace: ICard[]) => void;
  add: () => void;
  hasSets: () => boolean;
}

export function useGameBoard(): GameBoard | null {
  const [deck, setDeck] = useSyncedState<IDeck | null>('deck', null);
  const [deckReady, setDeckReady] = useSyncedState('deck-ready', false);
  const [cards, setCards] = useSyncedState<ICard[]>('board', null);
  const [cardIndex, setCardIndex] = useSyncedState('card-index', BOARD_SIZE);

  useEffect(() => {
    if (!deckReady) {
      const deck = shuffle(createDeck());

      const cards = deck.slice(0, BOARD_SIZE);

      setDeckReady(true);
      setDeck(deck);
      setCards(cards);
    }
  });

  if (!deck || !cards) return null;

  function deckEmpty(): boolean {
    return cardIndex >= deck.length;
  }

  function boardSize(): number {
    return cards.reduce((total, card) => total + (card == null ? 0 : 1), 0);
  }

  function replace(cardsToReplace: ICard[]): void {
    let index = cardIndex;

    const shouldRemove = boardSize() > BOARD_SIZE;

    const newCards = cards.map((card) => {
      if (cardsToReplace.includes(card)) {
        if (shouldRemove || index >= deck.length) {
          // either we're out of cards, or there are more than BOARD_SIZE
          // cards out! this space is now empty
          return null;
        }
        return deck[index++];
      }
      return card;
    });

    setCards(newCards);
    setCardIndex(index);
  }

  function add(): void {
    if (deckEmpty()) return;

    let index = cardIndex;
    let cardsToAdd = 3;

    // we should try to fill in any nulls before adding to the end
    const newCards = cards.map((card) => {
      if (card == null && index < deck.length && cardsToAdd > 0) {
        --cardsToAdd;
        return deck[index++];
      }
      return card;
    });

    // add any remaining cards to the end
    while (cardsToAdd-- > 0) {
      if (index < deck.length) {
        newCards.push(deck[index++]);
      } else {
        newCards.push(null);
      }
    }

    setCards(newCards);
    setCardIndex(index);
  }

  function hasSets(): boolean {
    const nonNullCards = cards.filter((card) => card != null);
    const possibleSets = combinations(nonNullCards, 3);
    return possibleSets.some(isSet);
  }

  return { cards, deckEmpty, replace, add, hasSets };
}
