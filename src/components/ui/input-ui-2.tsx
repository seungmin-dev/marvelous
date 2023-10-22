import styled from "@emotion/styled";

const Input = styled.input`
  padding: 5px 10px;
  font-size: 18px;
  width: 100px;
  border: ${({ theme }) => `1px solid ${theme.grayColor}`};
`;

interface InputProps {
  type: "text";
  defaultValue: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputUI2 = ({ type, defaultValue, onChangeInput }: InputProps) => {
  return (
    <Input type={type} defaultValue={defaultValue} onChange={onChangeInput} />
  );
};
