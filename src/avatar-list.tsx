import { Avatar } from './avatar';
import { IUser } from './types';

const { AutoLayout } = figma.widget;

interface Props {
  users: IUser[];
  showScores?: boolean;
  active?: string;
}

export function AvatarList({ users, showScores, active }: Props) {
  if (users.length === 0) {
    return null;
  }

  return (
    <AutoLayout spacing={4}>
      {users.map((user, i) => (
        <Avatar
          key={i}
          user={user}
          badge={showScores ? user.score : undefined}
          active={active === user.id}
        />
      ))}
    </AutoLayout>
  );
}
