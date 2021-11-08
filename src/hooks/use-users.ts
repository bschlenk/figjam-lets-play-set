import { IUser } from '../types';

const { useSyncedState } = figma.widget;

export type UseUsers = ReturnType<typeof useUsers>;

export function useUsers() {
  const [users, setUsers] = useSyncedState<IUser[]>('users', []);
  const [activeUser, setActiveUser] = useSyncedState<string | null>(
    'active-user',
    null,
  );

  function addSelf() {
    if (!users.find((user) => user.id === figma.currentUser.id)) {
      setUsers([...users, { ...figma.currentUser, score: 0 }]);
    }
  }

  function setActive() {
    setActiveUser(figma.currentUser.id);
  }

  function unsetActive() {
    setActiveUser(null);
  }

  function isActive(user?: IUser): boolean {
    const userId = user ? user.id : figma.currentUser.id;
    return userId === activeUser;
  }

  function setScore(updateScore: (currentScore: number) => number) {
    setUsers(
      users.map((user) =>
        isActive(user)
          ? { ...user, score: Math.max(0, updateScore(user.score)) }
          : user,
      ),
    );
  }

  return {
    users,
    activeUser,
    addSelf,
    setActive,
    unsetActive,
    isActive,
    setScore,
  };
}
