import styled from "@emotion/styled";

const Button = styled.button`
  border: none;
  background-color: white;
  width: 250px;
  height: 50px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 30px;
  transition: 0.2s ease all 0s;
  cursor: pointer;
  :hover {
    background-color: #ef151e;
    color: white;
    transform: translateY(-5px);
  }
`;

interface ButtonUIProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: () => Promise<void> | void;
}

export const ButtonUI = (props: ButtonUIProps) => {
  return (
    <Button type={props.type} onClick={props.onClick}>
      {props.text}
    </Button>
  );
};
