import { Card } from './card';
import { ICard } from './model';

const { AutoLayout } = figma.widget;

interface Props {
  cards: ICard[];
  selected: ICard[];
  onClick: (card: ICard) => void;
}

export function Board({ cards, selected, onClick }: Props) {
  return (
    <AutoLayout
      direction="vertical"
      width="hug-contents"
      height="hug-contents"
      padding={{ top: 6, bottom: 2 }}
    >
      {byChunks(cards, 4).map((row) => (
        <AutoLayout
          direction="horizontal"
          width="hug-contents"
          height="hug-contents"
          padding={{ top: 2, bottom: 6, left: 8, right: 8 }}
          spacing={8}
        >
          {row.map((card) => (
            <Card
              card={card}
              onClick={onClick}
              selected={selected.includes(card)}
            />
          ))}
        </AutoLayout>
      ))}
    </AutoLayout>
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
