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
  faHeart,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

interface Alert {
  id: string;
  personId: string;
  personName: string;
  type: string;
  content: string;
  createdAt: number;
}

const AlertList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Alert = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme, type }: { type: string }) =>
    type === "bookmark"
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
const Content = styled.p``;

export default function Notifications() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const fetchAlerts = async () => {
    const user = auth.currentUser;
    const alertQuery = query(
      collection(db, "alerts"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(alertQuery);
    const alertDocs = snapshot.docs.map((doc) => {
      const { personId, personName, type, content, createdAt } = doc.data();
      return { personId, personName, type, content, createdAt, id: doc.id };
    });

    setAlerts(alertDocs);
  };

  const onClickDelete = (docId: string) => async () => {
    const alertRef = doc(db, "alerts", docId);
    await deleteDoc(alertRef);

    const filteredAlerts = alerts.filter((alert) => alert.id !== docId);
    setAlerts(filteredAlerts);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <WrapperUI title="Notifications">
      <AlertList>
        {alerts.map((alert) => (
          <Alert key={alert.id} type={alert.type}>
            <AlertHeader>
              {alert.type === "bookmark" ? (
                <FontAwesomeIcon icon={faBookmark} />
              ) : alert.type === "heart" ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <FontAwesomeIcon icon={faUserGroup} />
              )}
              <Icon onClick={onClickDelete(alert.id)}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </Icon>
            </AlertHeader>
            <Content>
              <b>{alert.personName}</b>님이 나의 글 <b>{alert.content}</b>에{" "}
              <b>{alert.type === "bookmark" ? "북마크" : "하트"}</b>를 했어요
            </Content>
          </Alert>
        ))}
      </AlertList>
    </WrapperUI>
  );
}
