import { AvatarList } from './avatar-list';
import { Board } from './board';
import { Button } from './button';
import { createDeck, ICard, isSet } from './model';
import { IUser } from './types';
import { addOrRemove } from './utils';

const { useSyncedState, AutoLayout } = figma.widget;

interface Props {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

type GameState = 'IDLE' | 'SELECTING';

export function Game({ users, setUsers }: Props) {
  const [gameState, setGameState] = useSyncedState<GameState>(
    'gameState',
    'IDLE',
  );
  const [deck] = useSyncedState('deck', createDeck());
  let [nextCardIndex, setNextCardIndex] = useSyncedState('cardIndex', 12);
  const [board, setBoard] = useSyncedState(
    'board',
    deck.slice(0, nextCardIndex),
  );
  const [selected, setSelected] = useSyncedState<ICard[]>('selected', []);
  const [selectingUser, setSelectingUser] = useSyncedState<string | null>(
    'selectingUser',
    null,
  );

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      spacing={8}
      padding={{ top: 16, bottom: 16 }}
    >
      <AvatarList showScores active={selectingUser} users={users} />
      <Board
        cards={board}
        selected={selected}
        onClick={(card) => {
          if (gameState !== 'SELECTING') return;
          if (figma.currentUser.id !== selectingUser) return;

          const nextSelected = addOrRemove(selected, card);
          if (nextSelected.length === 3) {
            let increment = isSet(nextSelected) ? 1 : -1;
            setUsers(
              users.map((user) =>
                user.id === selectingUser
                  ? {
                      ...user,
                      score: user.score + increment,
                    }
                  : user,
              ),
            );
            setSelectingUser(null);
            const newBoard = [...board];
            for (let i = 0; i < newBoard.length; ++i) {
              const card = newBoard[i];
              if (nextSelected.includes(card)) {
                newBoard[i] = deck[nextCardIndex++];
              }
            }
            setBoard(newBoard);
            setNextCardIndex(nextCardIndex);
            setSelected([]);
            setGameState('IDLE');
          } else {
            setSelected(nextSelected);
          }
        }}
      />
      <Button
        label="Set!"
        disabled={gameState === 'SELECTING'}
        onClick={() => {
          setSelectingUser(figma.currentUser.id);
          setGameState('SELECTING');
        }}
      />
    </AutoLayout>
  );
}
