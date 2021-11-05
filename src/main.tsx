import { StartPage } from './start-page';
import { Game } from './game';
import { IUser } from './types';

const { useSyncedState, usePropertyMenu } = figma.widget;

export function Widget() {
  const [ready, setReady] = useSyncedState('ready', false);
  const [users, setUsers] = useSyncedState<IUser[]>('users', []);

  if (!ready) {
    return (
      <StartPage
        users={users}
        onClick={() => {
          if (!users.find((user) => user.id === figma.currentUser.id)) {
            setUsers([...users, { ...figma.currentUser, score: 0 }]);
          }
        }}
        onReady={() => {
          setReady(true);
        }}
      />
    );
  }

  return <Game users={users} setUsers={setUsers} />;
}
