import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import * as S from "../styles/login.style";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { GithubLogin } from "../components/github-login";
import { useRouter } from "../components/hooks/useRouter";
import { InputUI } from "../components/ui/input";
import { ButtonUI } from "../components/ui/button";

interface LoginForm {
  email: string;
  password: string;
}
interface SignupForm {
  email: string;
  name: string;
  password: string;
}

export default function LoginPage() {
  const { routeTo } = useRouter();
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(false);
  const [loginWithPassword, setLoginWithPassword] = useState(false);
  const { handleSubmit: handleSubmitSignup, register: registerSignup } =
    useForm<SignupForm>();
  const { handleSubmit, register } = useForm<LoginForm>();

  const onClickSetLoginWithPassword = () => {
    setLoginWithPassword((prev) => !prev);
  };
  const onValidSignup = async (data: SignupForm) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: data.name,
          photoURL: `/src/assets/symbols/logo${
            Math.floor(Math.random() * 21) + 1
          }.png`,
        });
        routeTo("/");
      });
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
  };
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
      if (error instanceof Error) console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onClickSetSignup = () => {
    setSignup((prev) => !prev);
  };

  useEffect(() => {
    const isLoggedIn = () => {
      auth.onAuthStateChanged((user) => {
        if (user) return routeTo("/");
        else return false;
      });
    };

    isLoggedIn();
  }, [routeTo]);

  return (
    <S.Wrapper>
      <S.LeftBox>
        <S.Video src="/src/assets/marvel_intro.mp4" autoPlay={true} loop />
      </S.LeftBox>
      <S.RightBox>
        {signup ? (
          <S.SignupWrapper>
            <S.Title>Sign up</S.Title>
            <S.Icon onClick={onClickSetSignup}>
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
            <S.Form onSubmit={handleSubmitSignup(onValidSignup)}>
              <InputUI
                type="text"
                register={registerSignup("email")}
                placeholder="email"
              />
              <InputUI
                type="text"
                register={registerSignup("name")}
                placeholder="name"
              />
              <InputUI
                type="password"
                register={registerSignup("password")}
                placeholder="password"
              />
              <ButtonUI type="submit" text="Join" />
            </S.Form>
          </S.SignupWrapper>
        ) : (
          <>
            <S.TextWrapper>
              <S.Title>Join Now</S.Title>
              <S.Text>
                Communicate with thousands of people
                <br />
                who love Marvel just like{" "}
                <span style={{ fontWeight: "bold" }}>YOU</span>
              </S.Text>
            </S.TextWrapper>
            <S.LoginWrapper>
              {loginWithPassword ? (
                <S.Form onSubmit={handleSubmit(onValid)}>
                  <S.Icon onClick={onClickSetLoginWithPassword}>
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
                  <InputUI
                    type="text"
                    register={register("email")}
                    placeholder="email"
                  />
                  <InputUI
                    type="password"
                    register={register("password")}
                    placeholder="password"
                  />
                  <ButtonUI
                    type="submit"
                    text={loading ? "loading" : "login"}
                  />
                  <S.RegisterText onClick={onClickSetSignup}>
                    no account yet?
                  </S.RegisterText>
                </S.Form>
              ) : (
                <>
                  <ButtonUI
                    onClick={onClickSetLoginWithPassword}
                    text={loading ? "loading" : "login with Password"}
                  />
                  <GithubLogin />
                </>
              )}
            </S.LoginWrapper>
          </>
        )}
      </S.RightBox>
    </S.Wrapper>
  );
}
