import { ICard, extractCardAttributes } from './model';
import { range } from './range';
import { Shape } from './shape';

const { AutoLayout } = figma.widget;

interface Props {
  card: ICard;
  selected: boolean;
  onClick: (card: ICard) => void;
}

export function Card({ card, selected, onClick }: Props) {
  const [count, color, shape, shade] = extractCardAttributes(card);

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      width={120}
      height={168}
      cornerRadius={8}
      stroke={selected ? '#16abff' : undefined}
      strokeWidth={2}
      fill="#fff"
      effect={{
        type: 'drop-shadow',
        offset: { x: 0, y: 2 },
        blur: 6,
        color: { r: 0, g: 0, b: 0, a: 0.25 },
      }}
      onClick={() => {
        onClick(card);
      }}
    >
      {range(count + 1, () => (
        <Shape color={color} shape={shape} shade={shade} />
      ))}
    </AutoLayout>
  );
}
