import { doc, getDoc } from "firebase/firestore";
import { Post } from "../../types/type";
import { db } from "../../../firebase";

export const useFetchPostById = () => {
  const fetchPostById = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    const data: Post = {
      post: docSnap.data()?.post,
      createdAt: docSnap.data()?.createdAt,
      photo: docSnap.data()?.photo,
      userId: docSnap.data()?.userId,
      username: docSnap.data()?.username,
      userphoto: docSnap.data()?.userphoto,
      heartedNum: docSnap.data()?.heartedNum,
      id,
    };

    return data;
  };

  return { fetchPostById };
};
