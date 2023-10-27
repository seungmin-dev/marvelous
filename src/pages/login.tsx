import { auth } from "../../firebase";
import * as S from "../styles/login.style";
import { useEffect, useState } from "react";
import { GithubLogin } from "../components/github-login";
import { useRouter } from "../commons/hooks/useRouter";
import { ButtonUI } from "../components/ui/button";
import { SignupForm } from "../components/signup-form";
import { LoginForm } from "../components/login-form";

export default function LoginPage() {
  const { routeTo } = useRouter();
  const [signup, setSignup] = useState(false);
  const [loginWithPassword, setLoginWithPassword] = useState(false);

  const onClickSetLoginWithPassword = () => {
    setLoginWithPassword((prev) => !prev);
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
        <S.InnerWrapper>
          {signup ? (
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
              <SignupForm onClickSetSignup={onClickSetSignup} />
            </>
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
                  <LoginForm
                    onClickSetSignup={onClickSetSignup}
                    onClickSetLoginWithPassword={onClickSetLoginWithPassword}
                  />
                ) : (
                  <>
                    <ButtonUI
                      onClick={onClickSetLoginWithPassword}
                      text="login with Password"
                      onComplete
                    />
                    <GithubLogin />
                  </>
                )}
              </S.LoginWrapper>
            </>
          )}
        </S.InnerWrapper>
      </S.RightBox>
    </S.Wrapper>
  );
}
