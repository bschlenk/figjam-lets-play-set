import { Avatar } from './avatar';
import { AvatarList } from './avatar-list';
import { Button } from './button';
import { UseUsers } from './hooks/use-users';
import { IUser } from './types';

const { AutoLayout, Text } = figma.widget;

interface Props {
  users: UseUsers;
  onNewGame: () => void;
}

export function WinScreen({ users, onNewGame }: Props) {
  const [winner, ...others] = [...users.users].sort(sortUsers);

  return (
    <AutoLayout direction="vertical" spacing={8}>
      <AutoLayout direction="horizontal" verticalAlignItems="center">
        <Avatar user={winner} />
        <Text>wins with {winner.score} points!</Text>
      </AutoLayout>
      <AvatarList users={others} showScores />
      <Button label="Start a new game" onClick={onNewGame} />
    </AutoLayout>
  );
}

function sortUsers(a: IUser, b: IUser) {
  if (a.score === b.score) {
    return a.name.localeCompare(b.name);
  }
  return a.score - b.score;
}
