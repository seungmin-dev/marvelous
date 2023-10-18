import styled from "@emotion/styled";
import type { InputUIProps } from "../../types/type";

export const Input = styled.input`
  width: 300px;
  height: 35px;
  padding: 5px 10px;
  font-size: 16px;
  :last-of-type {
    margin-bottom: 15px;
  }
`;

export const InputUI = (props: InputUIProps) => {
  return (
    <Input
      type={props.type}
      placeholder={props.placeholder}
      {...props.register}
    />
  );
};
