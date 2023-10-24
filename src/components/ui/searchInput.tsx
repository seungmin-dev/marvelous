import styled from "@emotion/styled";
import type { InputUIProps } from "../../types/type";

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 16px;
  ::placeholder {
    color: #bdbdbd;
  }
`;

export const SearchInput = (props: InputUIProps) => {
  return (
    <Input
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};
