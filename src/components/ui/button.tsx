import styled from "@emotion/styled";

const Button = styled.button`
  border: none;
  background-color: ${(props: ButtonProps) =>
    props.onComplete ? "white" : "#ddd"};
  width: 250px;
  height: 50px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 30px;
  transition: 0.2s ease all 0s;
  cursor: ${(props: ButtonProps) =>
    props.onComplete ? "pointer" : "not-allowed"};
  :hover {
    background-color: ${(props: ButtonProps) =>
      props.onComplete ? "#ef151e" : ""};
    color: ${(props: ButtonProps) => (props.onComplete ? "white" : "")};
    transform: ${(props: ButtonProps) =>
      props.onComplete ? "translateY(-5px)" : ""};
  }
`;
interface ButtonProps {
  onComplete: boolean;
}

interface ButtonUIProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: () => Promise<void> | void;
  onComplete?: boolean;
}

export const ButtonUI = (props: ButtonUIProps) => {
  return (
    <Button
      type={props.type}
      onClick={props.onClick}
      onComplete={props.onComplete as boolean}
    >
      {props.text}
    </Button>
  );
};
