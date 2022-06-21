import { Avatar } from './avatar';
import { Variant } from './constants';
import { IUser } from './types';

const { AutoLayout } = figma.widget;

interface Props {
  users: IUser[];
  showScores?: boolean;
  active?: string;
  activeVariant?: Variant;
}

export function AvatarList({
  users,
  showScores,
  active,
  activeVariant,
}: Props) {
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
          variant={
            active === user.id ? activeVariant || Variant.Active : undefined
          }
        />
      ))}
    </AutoLayout>
  );
}
