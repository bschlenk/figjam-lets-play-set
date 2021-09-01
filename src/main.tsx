import { createDeck, ICard } from './model';
import { Board } from './board';
import { addOrRemove, remove } from './utils';

const { Frame, SVG, Text, useSyncedState, usePropertyMenu } = figma.widget;

export function SetGame() {
  const [deck, setDeck] = useSyncedState('deck', createDeck());
  const [nextCardIndex, setNextCardIndex] = useSyncedState('cardIndex', 12);
  const [board, setBoard] = useSyncedState(
    'board',
    deck.slice(0, nextCardIndex),
  );
  const [selected, setSelected] = useSyncedState<ICard[]>('selected', []);

  /*
  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      tooltip: 'Increment',
      propertyName: 'increment',
      itemType: 'action',
    },
  ];
  if (count > 0) {
    propertyMenu.push({
      tooltip: 'Decrement',
      propertyName: 'decrement',
      itemType: 'action',
    });
  }

  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    if (propertyName === 'decrement') {
      setCount(count - 1);
    } else if (propertyName === 'increment') {
      setCount(count + 1);
    }
  });
  */

  return (
    <Board
      cards={board}
      selected={selected}
      onClick={(card) => {
        setSelected(addOrRemove(selected, card));
      }}
    />
  );
}
