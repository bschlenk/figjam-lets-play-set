import { IUser } from './types';
import { COLOR_PRIMARY, padding } from './styles';

const { Image, Frame, AutoLayout, Text } = figma.widget;

const SIZE = 96;

interface Props {
  user: IUser;
  badge?: string | number;
  active?: boolean;
}

export function Avatar({ user, badge, active }: Props) {
  const image = (
    <Image
      stroke={active ? COLOR_PRIMARY : '#fff'}
      strokeWidth={4}
      cornerRadius={SIZE}
      width={SIZE}
      height={SIZE}
      src={user.photoUrl}
    />
  );

  if (badge == null) {
    return image;
  }

  return (
    <Frame width={SIZE} height={SIZE}>
      {image}
      <AutoLayout
        x={64}
        y={4}
        direction="horizontal"
        horizontalAlignItems="center"
        fill="#52b6ff"
        cornerRadius={1000}
        padding={padding(4, 8)}
      >
        <Text fill="#fff" width="hug-contents">
          {badge}
        </Text>
      </AutoLayout>
    </Frame>
  );
}
