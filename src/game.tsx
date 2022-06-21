import { SELECTING_SECONDS, SPACING, Variant } from './constants';
import { AvatarList } from './avatar-list';
import { Board } from './board';
import { Button } from './button';
import { Countdown } from './countdown';
import { WinScreen } from './win-screen';
import { useCountdown } from './hooks/use-countdown';
import { useGameBoard } from './hooks/use-game-board';
import { UseUsers } from './hooks/use-users';
import { ICard, isSet } from './model';
import { addOrRemove, wait } from './utils';

const { Frame, useSyncedState, useEffect, AutoLayout } = figma.widget;

interface Props {
  users: UseUsers;
  onNewGame: () => void;
}

type GameState = 'IDLE' | 'SELECTING' | 'SELECT_BAD' | 'SELECT_GOOD';

const GAME_STATE_TO_VARIANT: Partial<Record<GameState, Variant>> = {
  SELECT_BAD: Variant.Failure,
  SELECT_GOOD: Variant.Success,
};

export function Game({ users, onNewGame }: Props) {
  const [gameState, setGameState] = useSyncedState<GameState>(
    'gameState',
    'IDLE',
  );
  const board = useGameBoard();
  const [selected, setSelected] = useSyncedState<ICard[]>('selected', []);

  function finishSelecting(isSet: boolean) {
    setGameState(isSet ? 'SELECT_GOOD' : 'SELECT_BAD');
  }

  function endTurn(isSet: boolean) {
    const increment = isSet ? 1 : -1;

    users.setScore((score) => score + increment);
    users.unsetActive();

    if (isSet) board.replace(selected);

    setSelected([]);
    setGameState('IDLE');
  }

  useEffect(() => {
    switch (gameState) {
      case 'SELECT_GOOD':
        wait(() => endTurn(true), 500);
        break;
      case 'SELECT_BAD':
        wait(() => endTurn(false), 500);
        break;
    }
  });

  const countdown = useCountdown(() => {
    finishSelecting(false);
  });

  // you can't return null from the top of a widget, so we temporarily show a tiny frame
  if (!board) return <Frame width={1} height={1} />;

  if (board.deckEmpty() && !board.hasSets()) {
    return (
      <WinScreen
        users={users}
        onNewGame={() => {
          setGameState('IDLE');
          setSelected([]);
          board.reset();
          onNewGame();
        }}
      />
    );
  }

  return (
    <AutoLayout
      direction="horizontal"
      verticalAlignItems="center"
      padding={{ right: SPACING }}
    >
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="center"
        spacing={8}
        padding={{ vertical: 16 }}
      >
        <AvatarList
          showScores
          users={users.users}
          active={users.activeUser}
          activeVariant={GAME_STATE_TO_VARIANT[gameState]}
        />
        <Board
          cards={board.cards}
          selected={selected}
          cardVariant={GAME_STATE_TO_VARIANT[gameState]}
          onClick={(card) => {
            if (gameState !== 'SELECTING') return;
            if (!users.isActive()) return;

            const nextSelected = addOrRemove(selected, card);
            setSelected(nextSelected);

            if (nextSelected.length !== 3) {
              return;
            }

            countdown.cancel();

            const selectedCardsAreASet = isSet(nextSelected);
            finishSelecting(selectedCardsAreASet);
          }}
        />
        {gameState === 'SELECTING' && countdown.countdown != null ? (
          <Countdown size={SELECTING_SECONDS} value={countdown.countdown} />
        ) : (
          <Button
            label="Set!"
            disabled={gameState !== 'IDLE'}
            onClick={() => {
              users.setActive();
              setGameState('SELECTING');
              countdown.start(SELECTING_SECONDS);
            }}
          />
        )}
      </AutoLayout>
      <Button
        round
        label="+"
        disabled={board.deckEmpty()}
        onClick={() => {
          board.add();
        }}
      />
    </AutoLayout>
  );
}
