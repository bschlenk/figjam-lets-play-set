import { AvatarList } from './avatar-list';
import { Board } from './board';
import { Button } from './button';
import { useGameBoard } from './hooks/use-game-board';
import { UseUsers } from './hooks/use-users';
import { ICard, isSet } from './model';
import { addOrRemove } from './utils';

const { Frame, useSyncedState, AutoLayout } = figma.widget;

interface Props {
  users: UseUsers;
}

type GameState = 'IDLE' | 'SELECTING';

export function Game({ users }: Props) {
  const [gameState, setGameState] = useSyncedState<GameState>(
    'gameState',
    'IDLE',
  );
  const board = useGameBoard();
  const [selected, setSelected] = useSyncedState<ICard[]>('selected', []);

  function finishSelectingAndUpdateScore(increment: number) {
    users.setScore((score) => score + increment);
    users.unsetActive();

    setSelected([]);
    setGameState('IDLE');
  }

  // you can't return null from the top of a widget, so we temporarily show a tiny frame
  if (!board) return <Frame width={1} height={1} />;

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      spacing={8}
      padding={{ top: 16, bottom: 16 }}
    >
      <AvatarList showScores active={users.activeUser} users={users.users} />
      <Board
        cards={board.cards}
        selected={selected}
        onClick={(card) => {
          if (gameState !== 'SELECTING') return;
          if (!users.isActive()) return;

          const nextSelected = addOrRemove(selected, card);
          if (nextSelected.length !== 3) {
            setSelected(nextSelected);
            return;
          }

          const selectedCardsAreASet = isSet(nextSelected);
          const increment = selectedCardsAreASet ? 1 : -1;

          if (selectedCardsAreASet) {
            board.replace(nextSelected);
          }

          finishSelectingAndUpdateScore(increment);
        }}
      />
      <Button
        label="Set!"
        disabled={gameState === 'SELECTING'}
        onClick={() => {
          users.setActive();
          setGameState('SELECTING');
        }}
      />
    </AutoLayout>
  );
}
