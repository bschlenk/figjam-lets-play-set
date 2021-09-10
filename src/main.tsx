import { createDeck, ICard } from './model';
import { Board } from './board';
import { addOrRemove } from './utils';
import { StartPage } from './start-page';

const { useSyncedState, usePropertyMenu } = figma.widget;

export function SetGame() {
  const [users, setUsers] = useSyncedState<CurrentUser[]>('users', []);
  const [deck, setDeck] = useSyncedState('deck', createDeck());
  const [nextCardIndex, setNextCardIndex] = useSyncedState('cardIndex', 12);
  const [board, setBoard] = useSyncedState(
    'board',
    deck.slice(0, nextCardIndex),
  );
  const [selected, setSelected] = useSyncedState<ICard[]>('selected', []);

  return (
    <StartPage
      users={users}
      onClick={() => {
        if (!users.find((user) => user.id === figma.currentUser.id)) {
          setUsers([...users, figma.currentUser]);
        }
      }}
    />
    /*
    <Board
      cards={board}
      selected={selected}
      onClick={(card) => {
        setSelected(addOrRemove(selected, card));
      }}
    />
    */
  );
}
