import { UseFormRegisterReturn } from "react-hook-form";

export interface Post {
  id: string;
  post: string[];
  photo: string[];
  photoLeng: number;
  createdAt: number;
  userId: string;
  username: string;
  userphoto: string;
  heartedNum: number;
  commentNum: number;
}

export interface InputUIProps {
  type: string;
  text?: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface User {
  username: string;
  userId: string;
  userphoto: string;
  userBgImg: string;
  follow?: string[];
  bookmarks?: string[];
}
