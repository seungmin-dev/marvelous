import { useEffect, useState } from "react";
import * as S from "../styles/login.style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../validation/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "./hooks/useRouter";
import { FirebaseError } from "firebase/app";
import { customErrors } from "../commons/custom-errors";
import { FormInputUI } from "./ui/form-input";
import { ButtonUI } from "./ui/button";

interface LoginForm {
  email: string;
  password: string;
}

interface ILoginFormProps {
  onClickSetSignup: () => void;
  onClickSetLoginWithPassword: () => void;
}
export const LoginForm = (props: ILoginFormProps) => {
  const { routeTo } = useRouter();
  const [loading, setLoading] = useState(false);
  const [fsError, setFsError] = useState("");

  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });

  const onValid = async (data: LoginForm) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          userCredential.user;
        }
      );
      routeTo("/");
    } catch (error) {
      if (error instanceof FirebaseError && typeof error.code === "string") {
        setFsError(customErrors(error.code));
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    reset();
    setFsError("");
  }, [reset]);

  return (
    <S.Form onSubmit={handleSubmit(onValid)}>
      <S.Icon onClick={props.onClickSetLoginWithPassword}>
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </S.Icon>
      <FormInputUI
        type="text"
        register={register("email")}
        placeholder="email"
        errorText={formState.errors.email?.message as string}
      />
      <FormInputUI
        type="password"
        register={register("password")}
        placeholder="password"
        errorText={formState.errors.password?.message as string}
      />
      <S.FsErrorText>{fsError}</S.FsErrorText>
      <ButtonUI
        onComplete={formState.isValid}
        type="submit"
        text={loading ? "loading" : "login"}
      />
      <S.RegisterText onClick={props.onClickSetSignup}>
        no account yet?
      </S.RegisterText>
    </S.Form>
  );
};
