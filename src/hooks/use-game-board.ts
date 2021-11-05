import { createDeck, ICard, IDeck } from '../model';

const { useSyncedState, useEffect } = figma.widget;

interface GameBoard {
  cards: ICard[];
  empty: () => boolean;
  replace: (cardsToReplace: ICard[]) => void;
}

export function useGameBoard(): GameBoard | null {
  const [deck, setDeck] = useSyncedState<IDeck | null>('deck', null);
  const [deckReady, setDeckReady] = useSyncedState('deck-ready', false);
  const [cards, setCards] = useSyncedState<ICard[]>('board', null);
  const [cardIndex, setCardIndex] = useSyncedState('card-index', 12);

  useEffect(() => {
    if (!deckReady) {
      const deck = createDeck();
      const cards = deck.slice(0, 12);

      setDeckReady(true);
      setDeck(deck);
      setCards(cards);
    }
  });

  if (!deck || !cards) return null;

  function empty(): boolean {
    return cardIndex >= deck.length;
  }

  function replace(cardsToReplace: ICard[]): void {
    let index = cardIndex;

    const newCards = cards.map((card) => {
      if (cardsToReplace.includes(card)) {
        if (index < deck.length) {
          return deck[index++];
        }
        // we're out of cards! that space is now empty
        return null;
      }
      return card;
    });

    setCards(newCards);
    setCardIndex(index);
  }

  return { cards, empty, replace };
}
