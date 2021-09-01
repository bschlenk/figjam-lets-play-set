import { Card } from './card';
import { ICard } from './model';

const { Frame, Text } = figma.widget;

interface Props {
  cards: ICard[];
  selected: ICard[];
  onClick: (card: ICard) => void;
}

export function Board({ cards, selected, onClick }: Props) {
  return (
    <Frame
      direction="vertical"
      width="hug-contents"
      height="hug-contents"
      spacing={8}
    >
      {byChunks(cards, 4).map((row) => (
        <Frame
          direction="horizontal"
          width="hug-contents"
          height="hug-contents"
          spacing={8}
        >
          {row.map((card) => (
            <Card
              card={card}
              onClick={onClick}
              selected={selected.includes(card)}
            />
          ))}
        </Frame>
      ))}
    </Frame>
  );
}

function byChunks<T>(arr: T[], size: number): T[][] {
  let chunks: T[][] = [];
  let chunk: T[] = [];

  for (const el of arr) {
    chunk.push(el);
    if (chunk.length === size) {
      chunks.push(chunk);
      chunk = [];
    }
  }

  if (chunk.length) {
    chunks.push(chunk);
  }

  return chunks;
}
