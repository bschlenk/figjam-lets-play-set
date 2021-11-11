import { ICard } from './model';
import { Card, EmptyCard } from './card';

const { AutoLayout, Frame } = figma.widget;

const SPACING = 16;

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
      padding={{ top: SPACING - 2, bottom: 2 }}
    >
      {byChunks(cards, 4).map((row, i) => (
        <AutoLayout
          key={i}
          direction="horizontal"
          width="hug-contents"
          height="hug-contents"
          padding={{
            top: 2,
            bottom: SPACING - 2,
            left: SPACING,
            right: SPACING,
          }}
          spacing={SPACING}
        >
          {row.map((card) =>
            card == null ? (
              <EmptyCard />
            ) : (
              <Card
                card={card}
                onClick={onClick}
                selected={selected.includes(card)}
              />
            ),
          )}
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
