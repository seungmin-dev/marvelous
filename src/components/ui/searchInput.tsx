import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputUIProps {
  type: string;
  text?: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
}
const Input = styled.input`
  width: 80%;
  padding: 10px 15px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  font-size: 16px;
  ::placeholder {
    color: #bdbdbd;
  }
`;

export const SearchInput = (props: InputUIProps) => {
  return <Input type={props.type} placeholder={props.placeholder} />;
};
