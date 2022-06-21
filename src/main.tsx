import { StartPage } from './start-page';
import { Game } from './game';
import { useUsers } from './hooks/use-users';

const { useSyncedState } = figma.widget;

export function Widget() {
  const [ready, setReady] = useSyncedState('ready', false);
  const users = useUsers();

  if (!ready) {
    return (
      <StartPage
        users={users.users}
        onClick={() => users.addSelf()}
        onReady={() => setReady(true)}
      />
    );
  }

  return (
    <Game
      users={users}
      onNewGame={() => {
        users.clear();
        setReady(false);
      }}
    />
  );
}
