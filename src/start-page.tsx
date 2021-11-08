import { AvatarList } from './avatar-list';
import { Button } from './button';
import { Clickable, IUser } from './types';

const { AutoLayout, Text, SVG } = figma.widget;

interface Props extends Clickable {
  users: IUser[];
  onReady?: () => void;
}

export function StartPage({ users, onClick, onReady }: Props) {
  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      spacing={56}
      cornerRadius={8}
      padding={64}
      stroke="#4d4d4d"
      strokeWidth={2}
      fill="#fff"
      onClick={onClick}
    >
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        spacing={8}
      >
        <Text fontSize={64} fill="#4d4d4d">
          Let's Play
        </Text>
        <SVG src={SET_TEXT_SVG} />
      </AutoLayout>
      <Text fontSize={24} fill="#4d4d4d">
        Click anywhere to join!
      </Text>
      <AvatarList users={users} />
      {users.length !== 0 && <Button label="Ready!" onClick={onReady} />}
    </AutoLayout>
  );
}

const SET_TEXT_SVG = `
<svg width="311" height="128" viewBox="0 0 311 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M126.907 7V125.687" stroke="#FD001A" stroke-width="1.25"/>
<path d="M131.907 7V125.687" stroke="#FD001A" stroke-width="1.25"/>
<path d="M176.907 7V27.5M176.907 125.687V100.094M176.907 52.5V74.5" stroke="#FD001A" stroke-width="1.25"/>
<path d="M171.907 7V27.5M171.907 125.687V100.094M171.907 52.5V74.5" stroke="#FD001A" stroke-width="1.25"/>
<path d="M166.907 7V27.5M166.907 125.687V100.094M166.907 52.5V74.5" stroke="#FD001A" stroke-width="1.25"/>
<path d="M161.907 7V27.5M161.907 125.687V100.094M161.907 52.5V74.5" stroke="#FD001A" stroke-width="1.25"/>
<path d="M156.907 7V27.5M156.907 125.687V100.094M156.907 52.5V74.5" stroke="#FD001A" stroke-width="1.25"/>
<path d="M151.907 7V27.5M151.907 125.687V100.094M151.907 52.5V74.5" stroke="#FD001A" stroke-width="1.25"/>
<path d="M146.907 7V27.5M146.907 125.687V100.094M146.907 52.5V74.5" stroke="#FD001A" stroke-width="1.25"/>
<path d="M141.907 7V27.5M141.907 125.687V100.094M141.907 52.5V74.5" stroke="#FD001A" stroke-width="1.25"/>
<path d="M136.907 7V27.5M136.907 125.687V100.094M136.907 52.5V74.5" stroke="#FD001A" stroke-width="1.25"/>
<path d="M181.907 7V27.5M181.907 125.687V99.5" stroke="#FD001A" stroke-width="1.25"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M112.217 125.727V1H195.422V32.25H144.899V47.6364H192.149V78.8864H144.899V94.4773H196.24V125.727H112.217ZM122.217 115.727V11H185.422V22.25H134.899V57.6364H182.149V68.8864H134.899V104.477H186.24V115.727H122.217Z" fill="#FD001A"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M212.24 32.25V1H310.785V32.25H277.853V125.727H245.172V32.25H212.24ZM300.785 11V22.25H267.853V115.727H255.172V22.25H222.24V11H300.785Z" fill="#A142F5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M63.6303 47.6136L62.5823 38.7935C62.2089 35.6506 59.1246 31.25 48.9898 31.25C43.7167 31.25 40.2218 32.65 38.2971 34.124C36.5299 35.4773 35.8761 36.9788 35.8761 38.6364C35.8761 39.7862 36.2285 40.8823 38.5729 42.4208C41.2015 44.1458 44.8862 45.356 48.6711 46.352L48.6985 46.3592L59.3403 49.2243C64.9612 50.71 73.863 53.3862 81.4613 58.9475C89.4989 64.8304 96.217 74.1014 96.217 87.7273C96.217 99.0766 91.5566 109.469 82.8031 116.867C74.1608 124.172 62.2346 128 48.3761 128C35.4571 128 24.0097 124.649 15.4025 117.886C6.65372 111.012 1.5715 101.16 0.765177 89.8716L0 79.1591H33.0057L33.7937 88.3002C34.0156 90.8739 35.1365 92.5511 37.2204 93.8925C39.6152 95.434 43.4564 96.5455 48.3761 96.5455C54.0128 96.5455 58.2169 95.0634 60.7299 93.2383C63.051 91.5526 63.9443 89.6557 63.9443 87.5227C63.9443 86.5695 63.7441 86.1233 63.5935 85.8644C63.4044 85.5394 62.9779 84.9942 61.9567 84.2862C59.6509 82.6875 55.9259 81.3053 50.4042 79.7715L50.3688 79.7617L37.4392 76.0675L37.4312 76.0652C28.4217 73.475 20.0447 69.5953 13.8123 63.5706C7.28553 57.2614 3.6034 49.0519 3.6034 39.25C3.6034 14.1047 26.1092 0 49.3989 0C73.0973 0 93.9627 14.3309 94.7789 37.2579L95.1475 47.6136H63.6303Z" fill="#00CC3F"/>
</svg>
`;
