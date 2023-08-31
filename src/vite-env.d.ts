/// <reference types="vite/client" />

interface IPost {
  title: string;
  text: string;
  _id: string;
  user: { username: string; _id: string };
  createdAt: string;
}

interface IComment {
  username: string;
  text: string;
  _id: string;
  user: { username: string; _id: string };
  createdAt: string;
}
