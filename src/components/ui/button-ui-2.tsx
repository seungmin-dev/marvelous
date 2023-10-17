import styled from "@emotion/styled";

interface ButtonProps {
  type: "submit" | "button" | "reset" | undefined;
  text: string;
  onComplete: boolean;
}

const Button = styled.button`
  cursor: pointer;
  min-width: 150px;
  padding: 15px 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #ef151e;
  color: white;
  border: none;
  border-radius: 10px;
  transition: 0.2s all ease 0s;
  :hover {
    background-color: #e01017;
  }
`;

export const ButtonUI2 = (props: ButtonProps) => {
  return <Button type={props.type}>{props.text}</Button>;
};
