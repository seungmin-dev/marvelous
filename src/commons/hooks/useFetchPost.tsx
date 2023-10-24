import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Post } from "../../types/type";
import { db } from "../../../firebase";

export const useFetchPost = () => {
  const fetchPosts = async (userId: string) => {
    const postQuery = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(postQuery);
    const posts = snapshot.docs.map((doc) => {
      const {
        post,
        photo,
        photoLeng,
        createdAt,
        userId,
        username,
        userphoto,
        userBgImg,
        heartedNum,
        commentNum,
      } = doc.data();
      return {
        post,
        photo,
        photoLeng,
        createdAt,
        userId,
        username,
        userphoto,
        userBgImg,
        heartedNum,
        commentNum,
        id: doc.id,
      };
    });

    return posts;
  };

  const fetchPostById = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    const data: Post = {
      post: docSnap.data()?.post,
      createdAt: docSnap.data()?.createdAt,
      photo: docSnap.data()?.photo,
      photoLeng: docSnap.data()?.photoLeng,
      userId: docSnap.data()?.userId,
      username: docSnap.data()?.username,
      userphoto: docSnap.data()?.userphoto,
      heartedNum: docSnap.data()?.heartedNum,
      commentNum: docSnap.data()?.commentNum,
      id,
    };

    return data;
  };

  return { fetchPosts, fetchPostById };
};
