import { Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

interface ButtonProps {
  type: "submit" | "button" | "reset" | undefined;
  text: string;
  onComplete?: boolean;
  onClick?: () => Promise<void>;
}

const Button = styled.button`
  cursor: ${({ onComplete }: { onComplete: boolean }) =>
    onComplete ? "pointer" : "not-allowed"};
  min-width: 150px;
  padding: 15px 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${({
    theme,
    onComplete,
  }: {
    onComplete: boolean;
    theme: Theme;
  }) => (onComplete ? theme.activeColor : theme.grayColor)};
  color: white;
  border: none;
  border-radius: 10px;
  transition: 0.2s all ease 0s;
  :hover {
    background-color: ${({
      theme,
      onComplete,
    }: {
      onComplete: boolean;
      theme: Theme;
    }) => (onComplete ? "#e01017" : theme.grayColor)};
  }
`;

export const ButtonUI2 = (props: ButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      type={props.type}
      onComplete={props.onComplete as boolean}
      theme={theme}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};
