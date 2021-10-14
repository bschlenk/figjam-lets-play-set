export interface Clickable {
  onClick?: () => void;
}

export interface IUser extends CurrentUser {
  score: number;
}
