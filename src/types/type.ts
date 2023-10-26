import { UseFormRegisterReturn } from "react-hook-form";

export interface Post {
  id: string;
  userId: string;
  content: string[];
  photo: string[];
  photoLeng: number;
  isComment: boolean;
  originPostId?: string;
  originPostContent?: string;
  heartNum: number;
  commentNum: number;
  createdAt: number;
  updatedAt: number;
}

export interface User {
  userId: string;
  userName: string;
  userPhoto: string;
  userBgImg: string;
  createdAt: number;
}

export interface Noti {
  id: string;
  sendId: string;
  sendName: string;
  type: "heart" | "bookmark" | "comment" | "follow";
  postId?: string;
  postContent?: string;
  createdAt: number;
}

export interface InputUIProps {
  type: string;
  text?: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
