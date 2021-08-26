import { AttrColor, AttrShade, AttrShape } from './attributes';
import { COLOR_RED, COLOR_GREEN, COLOR_PURPLE } from './constants';

const { SVG } = figma.widget;

export interface ShapeProps {
  color: AttrColor;
  shade: AttrShade;
  shape: AttrShape;
}

const diamond = `M9.231 40L80 8.547 150.769 40 80 71.453z`;
const oval = `M39.496 8.494C22.102 8.494 8.001 22.6 8 40c0 17.4 14.101 31.507 31.496 31.507h81.008C137.899 71.506 152 57.4 152 39.999c0-17.4-14.102-31.505-31.496-31.505z`;
const squiggle = `M46.283 17.427c11.677 0 22.697 8.924 36.997 8.924 29.542 0 43.903-18.11 56.413-18.11 7.871 0 11.807 4.412 11.807 11.023 0 40.116-38.016 48.296-44.606 48.296-21.864 0-37.783-6.562-47.754-6.562-9.97 0-24.664 10.761-34.11 10.761-9.446 0-16.53-6.824-16.53-14.698 0-16.799 14.038-39.634 37.783-39.634z`;

export function Shape({ color, shade, shape }: ShapeProps) {
  const shapePath = getShape(shape);
  const hexColor = getColor(color);

  const fill = shade === AttrShade.FILLED ? hexColor : 'none';
  const hatch = shade === AttrShade.STRIPED ? getHatch(shapePath) : '';

  const svgSrc = `
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 80"
      stroke="${hexColor}"
      stroke-width="4"
      fill="${fill}"
    >
      ${hatch}
      ${makePath(shapePath)}
    </svg>
  `;

  console.log(svgSrc);

  return <SVG src={svgSrc} />;
}

function makePath(d: string, fill?: string) {
  return `<path ${fill ? `fill="${fill}" ` : ''}d="${d}" />`;
}

function getShape(shape: AttrShape) {
  switch (shape) {
    case AttrShape.DIAMOND:
      return diamond;
    case AttrShape.OVAL:
      return oval;
    case AttrShape.SQUIGGLE:
      return squiggle;
  }
}

function getColor(color: AttrColor) {
  switch (color) {
    case AttrColor.RED:
      return COLOR_RED;
    case AttrColor.GREEN:
      return COLOR_GREEN;
    case AttrColor.PURPLE:
      return COLOR_PURPLE;
  }
}

function getHatch(path: string) {
  return `
    <mask id="hatch" style="mask-type:alpha" maskUnits="userSpaceOnUse">
      ${makePath(path, '#fff')}
    </mask>
    <g mask="url(#hatch)" stroke-width="2">
      <path d="M16 3V77" />
      <path d="M24 3V77" />
      <path d="M32 3V77" />
      <path d="M40 3V77" />
      <path d="M48 3V77" />
      <path d="M56 3V77" />
      <path d="M64 3V77" />
      <path d="M72 3V77" />
      <path d="M80 3V77" />
      <path d="M88 3V77" />
      <path d="M96 3V77" />
      <path d="M104 3V77" />
      <path d="M112 3V77" />
      <path d="M120 3V77" />
      <path d="M128 3V77" />
      <path d="M136 3V77" />
      <path d="M144 3V77" />
    </g>
  `;
}
