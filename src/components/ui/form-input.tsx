import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";

const Input = styled.input`
  width: 300px;
  height: 35px;
  padding: 5px 10px;
  font-size: 16px;
`;
const ErrorText = styled.span`
  color: #ef151e;
`;

interface FormInputUIProps {
  type: string;
  text?: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  errorText: string;
}

export const FormInputUI = (props: FormInputUIProps) => {
  return (
    <>
      <Input
        type={props.type}
        placeholder={props.placeholder}
        {...props.register}
      />
      <ErrorText>{props.errorText}</ErrorText>
    </>
  );
};
