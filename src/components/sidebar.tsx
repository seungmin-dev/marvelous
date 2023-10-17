import styled from "@emotion/styled";
import { SidebarContent } from "../router";
import { signOut } from "firebase/auth";
import { useRouter } from "./hooks/useRouter";
import { auth } from "../../firebase";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: pink;
`;

export default function Sidebar() {
  const { routeTo } = useRouter();

  const onClickLogout = () => {
    signOut(auth)
      .then(() => {
        routeTo("/login");
      })
      .catch((error) => {
        if (error instanceof Error) console.log(error);
      });
  };
  return (
    <Wrapper>
      {SidebarContent.map((sidebar, i) => (
        <div key={i}>{sidebar.label}</div>
      ))}
      <span onClick={onClickLogout}>log out</span>
    </Wrapper>
  );
}
