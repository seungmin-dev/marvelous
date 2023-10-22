import { UseFormRegisterReturn } from "react-hook-form";

export interface Post {
  id: string;
  post: string;
  photo: string[];
  createdAt: number;
  userId: string;
  username: string;
  userphoto: string;
  heartedNum: number;
}

export interface InputUIProps {
  type: string;
  text?: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
}

export interface User {
  username: string;
  userId: string;
  userphoto: string;
  userBgImg: string;
  follow?: string[];
  bookmarks?: string[];
}
