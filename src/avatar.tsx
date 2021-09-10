const { Image } = figma.widget;

const SIZE = 64;

interface Props {
  user: CurrentUser;
}

export function Avatar({ user }: Props) {
  return (
    <Image
      stroke="#fff"
      strokeWidth={2}
      cornerRadius={SIZE}
      width={SIZE}
      height={SIZE}
      src={user.photoURL}
    />
  );
}
