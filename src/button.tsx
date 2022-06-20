import { Clickable } from './types';

const { AutoLayout, Text } = figma.widget;

interface Props extends Clickable {
  label: string;
  disabled?: boolean;
  round?: boolean;
}

const enum Fill {
  Default = '#52b6ff',
  Disabled = '#7b858c',
  Hovered = '#2077b6',
}

export function Button({ label, disabled, round, onClick }: Props) {
  return (
    <AutoLayout
      fill={disabled ? Fill.Disabled : Fill.Default}
      padding={{ vertical: 12, horizontal: 24 }}
      cornerRadius={round ? 1000 : 8}
      effect={{
        type: 'drop-shadow',
        blur: 4,
        offset: { x: 0, y: 4 },
        color: { r: 0, g: 0, b: 0, a: 0.25 },
      }}
      onClick={disabled ? undefined : onClick}
      hoverStyle={{ fill: Fill.Hovered }}
    >
      <Text fontSize={24} fill="#fff">
        {label}
      </Text>
    </AutoLayout>
  );
}
