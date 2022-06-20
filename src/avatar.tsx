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

  badge = '' + badge;

  return (
    <Frame key={key} width={SIZE} height={SIZE}>
      {image}
      <AutoLayout
        x={64}
        y={4}
        fill="#52b6ff"
        cornerRadius={1000}
        width={20 + badge.length * 5}
        verticalAlignItems="center"
        horizontalAlignItems="end"
        padding={{ horizontal: 4, top: 1 }}
      >
        <Text
          fill="#fff"
          height={20}
          width="fill-parent"
          horizontalAlignText="center"
        >
          {badge}
        </Text>
      </AutoLayout>
    </Frame>
  );
}
