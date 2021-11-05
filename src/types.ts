export interface Clickable {
  onClick?: () => void;
}

export interface IUser extends User {
  score: number;
}

export type Key = string | number;
