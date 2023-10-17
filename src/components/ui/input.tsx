import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";

export const Input = styled.input`
  width: 300px;
  height: 35px;
  padding: 5px 10px;
  font-size: 16px;
  :last-of-type {
    margin-bottom: 15px;
  }
`;

interface InputUIProps {
  type: string;
  text?: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
}
export const InputUI = (props: InputUIProps) => {
  return (
    <Input
      type={props.type}
      placeholder={props.placeholder}
      {...props.register}
    />
  );
};
