import { useEffect, useState } from "react";
import { WrapperUI } from "../components/ui/wrapper";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCircleXmark,
  faComment,
  faHeart,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { BlankUI } from "../components/ui/blank";
import { Link } from "react-router-dom";
import { Theme, useTheme } from "@emotion/react";

interface Noti {
  id: string;
  userId: string;
  sendId: string;
  sendName: string;
  type: "comment" | "bookmark" | "heart" | "follow";
  postId: string;
  postContent: string[];
  createdAt: number;
}

const AlertList = styled.div`
  width: 100%;
  min-height: 30vh;
  max-height: 90vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  padding: 10px 20px;
`;
const Alert = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme, type }: { type: string; theme: Theme }) =>
    type === "comment"
      ? theme.alert.comment
      : type === "bookmark"
      ? theme.alert.bookmark
      : type === "heart"
      ? theme.alert.heart
      : theme.alert.follow};
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const AlertHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Icon = styled.span`
  cursor: pointer;
  svg {
    width: 20px;
  }
`;
const Content = styled.p`
  color: ${({ theme }) => theme.textColor};
`;
const Text = styled.span`
  color: ${({ theme }) => theme.textColor};
`;

export default function Notifications() {
  const [notis, setNotis] = useState<Noti[]>([]);
  const theme = useTheme();

  const fetchNotis = async () => {
    const user = auth.currentUser;
    const alertQuery = query(
      collection(db, "noti"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(alertQuery);
    const notiDocs = snapshot.docs.map((doc) => {
      const { userId, sendId, sendName, type, postId, postContent, createdAt } =
        doc.data();
      return {
        userId,
        sendId,
        sendName,
        type,
        postId,
        postContent,
        createdAt,
        id: doc.id,
      };
    });

    setNotis(notiDocs);
  };

  const onClickDelete = (docId: string) => async () => {
    const notiRef = doc(db, "noti", docId);
    await deleteDoc(notiRef);

    const filteredAlerts = notis.filter((noti) => noti.id !== docId);
    setNotis(filteredAlerts);
  };

  useEffect(() => {
    fetchNotis();
  }, []);

  return (
    <WrapperUI title="Notifications">
      {notis && notis.length > 0 ? (
        <AlertList>
          {notis.map((noti) => (
            <Alert key={noti.id} type={noti.type} theme={theme}>
              <AlertHeader>
                {noti.type === "bookmark" ? (
                  <FontAwesomeIcon icon={faBookmark} />
                ) : noti.type === "heart" ? (
                  <FontAwesomeIcon icon={faHeart} />
                ) : noti.type === "follow" ? (
                  <FontAwesomeIcon icon={faUserGroup} />
                ) : (
                  <FontAwesomeIcon icon={faComment} />
                )}
                <Icon onClick={onClickDelete(noti.id)}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </Icon>
              </AlertHeader>
              {noti.type === "follow" ? (
                <Content>
                  <Link to={`/user-profile?${noti.sendId}`}>
                    <Text>
                      <b>{noti.sendName}</b>
                    </Text>
                  </Link>
                  님이 나를 <b>팔로우</b>하기 시작했어요
                </Content>
              ) : noti.type === "comment" ? (
                <Content>
                  <Link to={`/user-profile?${noti.sendId}`}>
                    <Text>
                      <b>{noti.sendName}</b>
                    </Text>
                  </Link>
                  님이 나의 글{" "}
                  <Link to={`/post`} state={{ postId: noti.id.split("-")[0] }}>
                    <Text>
                      <b>{noti.postContent.join(" ")}...</b>
                    </Text>
                  </Link>
                  에 <b>댓글</b>을 달았어요
                </Content>
              ) : (
                <Content>
                  <Link to={`/user-profile?${noti.sendId}`}>
                    <Text>
                      <b>{noti.sendName}</b>
                    </Text>
                  </Link>
                  님이 나의 글{" "}
                  <Link to={`/post`} state={{ postId: noti.id.split("-")[0] }}>
                    <Text>
                      <b>{noti.postContent.join(" ")}...</b>
                    </Text>
                  </Link>
                  에 <b>{noti.type === "bookmark" ? "북마크" : "하트"}</b>를
                  했어요
                </Content>
              )}
            </Alert>
          ))}
        </AlertList>
      ) : (
        <BlankUI text="새 알림" />
      )}
    </WrapperUI>
  );
}
