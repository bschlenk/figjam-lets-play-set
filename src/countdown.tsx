import { range } from './range';

const { AutoLayout, Text } = figma.widget;

interface Props {
  size: number;
  value: number;
}

export function Countdown({ size, value }: Props) {
  const numbers = range(size, (i) => {
    const display = i + 1;
    const isActive = display === value;
    return (
      <Text
        key={i}
        fontSize={isActive ? 32 : 24}
        fill={isActive ? '#e24e4e' : '#222'}
      >
        {display}
      </Text>
    );
  }).reverse();

  return (
    <AutoLayout
      spacing={8}
      padding={{ vertical: 9, horizontal: 0 }}
      verticalAlignItems="end"
    >
      {numbers}
    </AutoLayout>
  );
}
