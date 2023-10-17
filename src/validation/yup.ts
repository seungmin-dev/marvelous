import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email("이메일 형식이 올바르지 않아요")
    .required("이메일을 입력해주세요."),
  name: yup.string().required("이름을 입력해주세요."),
  password: yup
    .string()
    .min(6, "비밀번호는 최소 6자리 이상으로 입력해주세요.")
    .required("비밀번호를 입력해주세요."),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("이메일 형식이 올바르지 않아요")
    .required("이메일을 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});
