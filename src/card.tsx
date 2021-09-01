import { ICard, extractCardAttributes } from './model';
import { range } from './range';
import { Shape } from './shape';

const { Frame } = figma.widget;

interface Props {
  card: ICard;
  selected: boolean;
  onClick: (card: ICard) => void;
}

export function Card({ card, selected, onClick }: Props) {
  const [count, color, shape, shade] = extractCardAttributes(card);

  return (
    <Frame
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      width="hug-contents"
      height={250}
      cornerRadius={8}
      stroke={selected ? '#76a6f5' : '#ccc'}
      onClick={() => {
        onClick(card);
      }}
    >
      {range(count + 1, () => (
        <Shape color={color} shape={shape} shade={shade} />
      ))}
    </Frame>
  );
}
