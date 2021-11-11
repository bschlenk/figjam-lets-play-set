import { Clickable } from './types';

const { AutoLayout, Text } = figma.widget;

interface Props extends Clickable {
  label: string;
  disabled?: boolean;
  round?: boolean;
  primary?: boolean;
}

export function Button({ label, disabled, round, primary, onClick }: Props) {
  return (
    <AutoLayout
      fill={disabled ? '#7b858c' : '#52b6ff'}
      padding={{ vertical: 12, horizontal: 24 }}
      cornerRadius={round ? 1000 : 8}
      effect={{
        type: 'drop-shadow',
        blur: 4,
        offset: { x: 0, y: 4 },
        color: { r: 0, g: 0, b: 0, a: 0.25 },
      }}
      onClick={disabled ? undefined : onClick}
    >
      <Text fontSize={24} fill="#fff">
        {label}
      </Text>
    </AutoLayout>
  );
}
