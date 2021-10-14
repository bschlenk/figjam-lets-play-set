export interface Clickable {
  onClick?: () => void;
}

type CurrentUser = typeof figma.currentUser;

export interface IUser extends CurrentUser {
  score: number;
}
