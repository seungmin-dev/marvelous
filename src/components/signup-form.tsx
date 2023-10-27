import { useForm } from "react-hook-form";
import * as S from "../styles/login.style";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "../validation/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useRouter } from "../commons/hooks/useRouter";
import { FirebaseError } from "firebase/app";
import { customErrors } from "../commons/custom-errors";
import { FormInputUI } from "./ui/form-input";
import { ButtonUI } from "./ui/button";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

interface SignupForm {
  email: string;
  name: string;
  password: string;
}
interface ISignupFormProps {
  onClickSetSignup: () => void;
}
export const SignupForm = (props: ISignupFormProps) => {
  const { routeTo } = useRouter();
  const [loading, setLoading] = useState(false);
  const [fsErrorSignup, setFsErrorSignup] = useState("");
  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: "onChange",
  });
  const onValidSignup = async (data: SignupForm) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: data.name,
          photoURL: `/assets/symbols/symbol${
            Math.floor(Math.random() * 21) + 1
          }.png`,
        });

        // db에 user 정보 생성
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          userName: user.displayName,
          userId: user.uid,
          userPhoto: user.photoURL,
          userBgImg: "/assets/emptyBgImg.png",
          createdAt: Date.now(),
        });
        routeTo("/");
      });
    } catch (error) {
      if (error instanceof FirebaseError && typeof error.code === "string")
        setFsErrorSignup(customErrors(error.code));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    reset();
    setFsErrorSignup("");
  }, [reset]);
  return (
    <S.SignupWrapper>
      <S.Form onSubmit={handleSubmit(onValidSignup)}>
        <S.Icon onClick={props.onClickSetSignup}>
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
          type="text"
          register={register("name")}
          placeholder="name"
          errorText={formState.errors.name?.message as string}
        />
        <FormInputUI
          type="password"
          register={register("password")}
          placeholder="password"
          errorText={formState.errors.password?.message as string}
        />
        <S.FsErrorText>{fsErrorSignup}</S.FsErrorText>
        <ButtonUI
          type="submit"
          text={loading ? "loading" : "Join"}
          onComplete={formState.isValid}
        />
      </S.Form>
    </S.SignupWrapper>
  );
};
