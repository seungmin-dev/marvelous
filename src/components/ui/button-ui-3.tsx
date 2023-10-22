import styled from "@emotion/styled";

const Button = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.grayColor};
  font-weight: bold;
`;

interface ButtonProps {
  text: string;
  type: "button" | "submit" | undefined;
  onClickFn: () => void | Promise<void>;
}
export const ButtonUI3 = ({ text, type, onClickFn }: ButtonProps) => {
  return (
    <Button type={type} onClick={onClickFn}>
      {text}
    </Button>
  );
};
