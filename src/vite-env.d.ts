/// <reference types="vite/client" />

interface IUser {
  username: string;
  _id: string;
}

interface IUserCtx {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

interface IPost {
  title: string;
  text: string;
  _id: string;
  user: { username: string; _id: string };
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

interface IComment {
  username: string;
  text: string;
  _id: string;
  user: { username: string; _id: string };
  createdAt: string;
}
