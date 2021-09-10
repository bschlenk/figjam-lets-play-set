import { Clickable } from './types';

const { AutoLayout, Text } = figma.widget;

interface Props extends Clickable {
  label: string;
}

export function Button({ label, onClick }: Props) {
  return (
    <AutoLayout
      fill="#52b6ff"
      padding={{ top: 12, bottom: 12, left: 24, right: 24 }}
      cornerRadius={8}
      effect={{
        type: 'drop-shadow',
        blur: 4,
        offset: { x: 0, y: 4 },
        color: { r: 0, g: 0, b: 0, a: 0.25 },
      }}
      onClick={onClick}
    >
      <Text fontSize={24} fill="#fff">
        {label}
      </Text>
    </AutoLayout>
  );
}
