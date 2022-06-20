import { IUser, Key } from './types';
import { COLOR_PRIMARY } from './constants';

const { Image, Frame, AutoLayout, Text } = figma.widget;

const SIZE = 96;

interface Props {
  user: IUser;
  badge?: string | number;
  active?: boolean;
  key?: Key;
}

export function Avatar({ user, badge, active, key }: Props) {
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
    <Frame key={key} width={SIZE} height={SIZE}>
      {image}
      <Frame
        x={64}
        y={4}
        width={20}
        height={20}
        fill="#52b6ff"
        cornerRadius={1000}
      >
        <Text
          fill="#fff"
          height={20}
          width={20}
          horizontalAlignText="center"
          x={4}
        >
          {badge}
        </Text>
      </Frame>
    </Frame>
  );
}
