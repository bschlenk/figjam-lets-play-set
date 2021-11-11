import { ICard, extractCardAttributes } from './model';
import { range } from './range';
import { Shape } from './shape';
import { CARD_SHADOW } from './constants';

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
      key={card}
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      width={120}
      height={168}
      cornerRadius={8}
      stroke={selected ? '#16abff' : undefined}
      strokeWidth={3}
      fill="#fff"
      effect={CARD_SHADOW}
      onClick={() => {
        onClick(card);
      }}
    >
      {range(count + 1, (i) => (
        <Shape key={i} color={color} shape={shape} shade={shade} />
      ))}
    </AutoLayout>
  );
}
