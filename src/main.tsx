import { AttrColor, AttrShade, AttrShape } from './attributes';
import { Shape } from './shape';

const { widget } = figma;
const { Frame, SVG, Text, useSyncedState, usePropertyMenu } = widget;

const buttonSrc = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="15.5" stroke="black" stroke-opacity="0.1" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 8H15V15H8V17H15V24H17V17H24V15H17V8Z" fill="black" fill-opacity="0.8"/>
  </svg>
`;

export function Counter() {
  const [count, setCount] = useSyncedState('count', 0);
  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      tooltip: 'Increment',
      propertyName: 'increment',
      itemType: 'action',
    },
  ];
  if (count > 0) {
    propertyMenu.push({
      tooltip: 'Decrement',
      propertyName: 'decrement',
      itemType: 'action',
    });
  }

  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    if (propertyName === 'decrement') {
      setCount(count - 1);
    } else if (propertyName === 'increment') {
      setCount(count + 1);
    }
  });

  return (
    <Frame
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={{ left: 16, right: 8, top: 8, bottom: 8 }}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={12}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.2 },
        offset: { x: 0, y: 0 },
        radius: 2,
        spread: 2,
      }}
    >
      <SVG src={buttonSrc} onMouseDown={() => setCount(count + 1)} />
      <Frame
        direction="horizontal"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        height="hug-contents"
        padding={{ left: 24, right: 24, top: 12, bottom: 12 }}
        fill="#E6E6E6"
        cornerRadius={8}
      >
        <Text fontSize={32} horizontalAlignText="center">
          {count}
        </Text>
      </Frame>
      <Shape
        shape={AttrShape.SQUIGGLE}
        color={AttrColor.PURPLE}
        shade={AttrShade.STRIPED}
      />
      <Shape
        shape={AttrShape.OVAL}
        color={AttrColor.PURPLE}
        shade={AttrShade.STRIPED}
      />
      <Shape
        shape={AttrShape.DIAMOND}
        color={AttrColor.PURPLE}
        shade={AttrShade.STRIPED}
      />
    </Frame>
  );
}
