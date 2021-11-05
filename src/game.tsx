import { AvatarList } from './avatar-list';
import { Board } from './board';
import { Button } from './button';
import { useGameBoard } from './hooks/use-game-board';
import { ICard, isSet } from './model';
import { IUser } from './types';
import { addOrRemove } from './utils';

const { Frame, useSyncedState, AutoLayout } = figma.widget;

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
  const board = useGameBoard();
  const [selected, setSelected] = useSyncedState<ICard[]>('selected', []);
  const [selectingUser, setSelectingUser] = useSyncedState<string | null>(
    'selectingUser',
    null,
  );

  // you can't return null from the top of a widget, so we temporarily show a tiny frame
  if (!board) return <Frame width={1} height={1} />;

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      spacing={8}
      padding={{ top: 16, bottom: 16 }}
    >
      <AvatarList showScores active={selectingUser} users={users} />
      <Board
        cards={board.cards}
        selected={selected}
        onClick={(card) => {
          if (gameState !== 'SELECTING') return;
          if (figma.currentUser.id !== selectingUser) return;

          const nextSelected = addOrRemove(selected, card);
          if (nextSelected.length !== 3) {
            setSelected(nextSelected);
            return;
          }

          const selectedCardsAreASet = isSet(nextSelected);
          const increment = selectedCardsAreASet ? 1 : -1;

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

          if (selectedCardsAreASet) {
            board.replace(nextSelected);
          }

          setSelected([]);
          setGameState('IDLE');
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
