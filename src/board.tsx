import { ICard } from './model';
import { Card, EmptyCard } from './card';
import { CARD_ROWS, SPACING, Variant } from './constants';
import { byChunks } from './utils';

const { AutoLayout } = figma.widget;

interface Props {
  cards: ICard[];
  selected: ICard[];
  cardVariant?: Variant;
  onClick: (card: ICard) => void;
}

export function Board({ cards, selected, cardVariant, onClick }: Props) {
  return (
    <AutoLayout
      direction="horizontal"
      width="hug-contents"
      height="hug-contents"
      spacing={SPACING - 12}
      padding={{
        top: SPACING - 4,
        bottom: SPACING - 8,
        left: SPACING - 6,
        right: SPACING - 6,
      }}
    >
      {byChunks(cards, CARD_ROWS).map((row, i) => (
        <AutoLayout
          key={i}
          direction="vertical"
          width="hug-contents"
          height="hug-contents"
          padding={{ top: 4, bottom: 8, left: 6, right: 6 }}
          spacing={SPACING}
        >
          {row.map((card) =>
            card == null ? (
              <EmptyCard />
            ) : (
              <Card
                card={card}
                onClick={onClick}
                variant={
                  selected.includes(card)
                    ? cardVariant || Variant.Active
                    : undefined
                }
              />
            ),
          )}
        </AutoLayout>
      ))}
    </AutoLayout>
  );
}
