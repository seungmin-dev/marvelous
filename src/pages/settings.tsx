import { WrapperUI } from "../components/ui/wrapper";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { modeState } from "../store";

const List = styled.ul`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
`;
const Item = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px 10px;
  border-bottom: ${({ theme }) => `1px solid ${theme.grayColor}`};
`;
const ItemText = styled.span`
  font-size: 18px;
`;
const Icon = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  transition: 1s all ease 0s;
  color: ${({ theme }) => theme.textColor};
  :active {
    transform: rotateZ(360deg) scale(70%);
  }
`;

export default function Settings() {
  const [mode, setMode] = useRecoilState(modeState);

  const onClickMode = () => {
    if (mode === "dark") setMode("light");
    else setMode("dark");
  };

  return (
    <WrapperUI title="Settings">
      <List>
        <Item>
          <ItemText>다크모드</ItemText>
          <Icon onClick={onClickMode}>
            {mode !== "light" ? (
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            )}
          </Icon>
        </Item>
      </List>
    </WrapperUI>
  );
}
