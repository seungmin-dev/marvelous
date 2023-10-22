import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNoti } from "./useNoti";
import { FirebaseError } from "firebase/app";
import { Modal } from "antd";
import { useState } from "react";

export interface Following {
  username: string;
  userId: string;
  userphoto: string;
}
interface FollowInProfileProps {
  followings: Following[];
  setFollowings: React.Dispatch<React.SetStateAction<Following[]>>;
  objectUserId: string;
}

export const useFollow = () => {
  const user = auth.currentUser;
  const [following, setFollowing] = useState(false);
  const { openNotification } = useNoti();

  const onClickFollow = (objectId: string) => async () => {
    setFollowing((prev) => !prev);
    try {
      const userRef = doc(db, "users", user?.uid as string);
      await setDoc(
        userRef,
        {
          userId: user?.uid,
          username: user?.displayName,
          follow: following ? arrayRemove(objectId) : arrayUnion(objectId),
        },
        { merge: true }
      );

      // 팔로우한 대상에게 알림 보내기
      const followRef = doc(db, "alerts", `${user?.uid}-${objectId}`);

      if (!following) {
        await setDoc(doc(db, "alerts", `${user?.uid}-${objectId}`), {
          userId: objectId,
          personId: user?.uid,
          personName: user?.displayName,
          type: "follow",
          createdAt: Date.now(),
        });
      } else {
        await deleteDoc(followRef);
      }

      openNotification(following ? "언팔로우" : "팔로우");
    } catch (error) {
      setFollowing((prev) => !prev);
      if (error instanceof FirebaseError)
        Modal.error({ content: "팔로우에 실패했어요 😮‍💨" });
    }
  };

  const fetchFollowYn = async (objectUserId: string) => {
    const ref = doc(db, "users", user?.uid as string);
    const snapshot = await getDoc(ref);
    const result = { following: snapshot.data()?.follow };

    if (result.following.includes(objectUserId)) setFollowing(true);
  };

  const onClickFollowInProfile =
    ({ followings, objectUserId, setFollowings }: FollowInProfileProps) =>
    async () => {
      const filteredList = followings.filter(
        (following) => following.userId !== objectUserId
      );
      setFollowings(filteredList);

      const userRef = doc(db, "users", user?.uid as string);
      await setDoc(
        userRef,
        {
          userId: user?.uid,
          username: user?.displayName,
          follow: arrayRemove(objectUserId),
        },
        { merge: true }
      );
    };

  return { following, onClickFollow, fetchFollowYn, onClickFollowInProfile };
};
