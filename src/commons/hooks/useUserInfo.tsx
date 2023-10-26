import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { User } from "../../types/type";

export const useUserInfo = () => {
  const fetchAllUsers = async () => {
    const users = await getDocs(collection(db, "users"));
    const usersArr: User[] = [];

    users.docs.map((doc) => {
      const data: User = {
        userId: doc.id,
        userName: doc.data()?.userName,
        userPhoto: doc.data()?.userPhoto,
        userBgImg: doc.data()?.userBgImg,
        createdAt: doc.data()?.createdAt,
      };
      usersArr.push(data);
    });

    return usersArr;
  };

  const fetchUserInfo = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userInfo = await getDoc(userRef);

    const data: User = {
      userId: userInfo.id,
      userName: userInfo.data()?.userName,
      userPhoto: userInfo.data()?.userPhoto,
      userBgImg: userInfo.data()?.userBgImg,
      createdAt: userInfo.data()?.createdAt,
    };

    return data;
  };

  const fetchObjectUserInfo = async (postId: string) => {
    const docRef = doc(db, "posts", postId);
    const userId = (await getDoc(docRef)).data()?.userId;

    return fetchUserInfo(userId);
  };

  return { fetchAllUsers, fetchUserInfo, fetchObjectUserInfo };
};
