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
        userId,
        content,
        photo,
        photoLeng,
        heartNum,
        commentNum,
        isComment,
        originPostId,
        originPostContent,
        createdAt,
        updatedAt,
      } = doc.data();
      return {
        userId,
        content,
        photo,
        photoLeng,
        heartNum,
        commentNum,
        isComment,
        originPostId,
        originPostContent,
        createdAt,
        updatedAt,
        id: doc.id,
      };
    });

    return posts;
  };

  const fetchPostById = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    const data: Post = {
      userId: docSnap.data()?.userId,
      content: docSnap.data()?.content,
      photo: docSnap.data()?.photo,
      photoLeng: docSnap.data()?.photoLeng,
      heartNum: docSnap.data()?.heartNum,
      commentNum: docSnap.data()?.commentNum,
      isComment: docSnap.data()?.isComment,
      originPostId: docSnap.data()?.originPostId,
      originPostContent: docSnap.data()?.originPostContent,
      createdAt: docSnap.data()?.createdAt,
      updatedAt: docSnap.data()?.updatedAt,
      id,
    };

    return data;
  };

  const fetchPostsByHashtag = async (hashtag: string) => {
    const keywordQuery = query(
      collection(db, "posts"),
      where("content", "array-contains", hashtag),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(keywordQuery);
    const posts = snapshot.docs.map((doc) => {
      const {
        userId,
        content,
        photo,
        photoLeng,
        heartNum,
        commentNum,
        isComment,
        originPostId,
        originPostContent,
        createdAt,
        updatedAt,
      } = doc.data();
      return {
        userId,
        content,
        photo,
        photoLeng,
        heartNum,
        commentNum,
        isComment,
        originPostId,
        originPostContent,
        createdAt,
        updatedAt,
        id: doc.id,
      };
    });
    return posts;
  };

  const fetchPostsByKeyword = async (keyword: string) => {
    const keywordQuery = query(
      collection(db, "posts"),
      where("content", "array-contains-any", keyword.split(" ")),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(keywordQuery);
    const posts = snapshot.docs.map((doc) => {
      const {
        userId,
        content,
        photo,
        photoLeng,
        heartNum,
        commentNum,
        isComment,
        originPostId,
        originPostContent,
        createdAt,
        updatedAt,
      } = doc.data();
      return {
        userId,
        content,
        photo,
        photoLeng,
        heartNum,
        commentNum,
        isComment,
        originPostId,
        originPostContent,
        createdAt,
        updatedAt,
        id: doc.id,
      };
    });
    return posts;
  };

  return {
    fetchPosts,
    fetchPostById,
    fetchPostsByHashtag,
    fetchPostsByKeyword,
  };
};
