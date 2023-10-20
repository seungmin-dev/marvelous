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
  background-color: ${({ theme, onComplete }: { onComplete: boolean }) =>
    onComplete ? theme.activeColor : theme.grayColor};
  color: white;
  border: none;
  border-radius: 10px;
  transition: 0.2s all ease 0s;
  :hover {
    background-color: ${({ theme, onComplete }: { onComplete: boolean }) =>
      onComplete ? "#e01017" : theme.grayColor};
  }
`;

export const ButtonUI2 = (props: ButtonProps) => {
  return (
    <Button
      type={props.type}
      onComplete={props.onComplete as boolean}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};
