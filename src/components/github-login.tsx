import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ButtonUI } from "./ui/button";

export const GithubLogin = () => {
  const navigate = useNavigate();

  const onClickLoginGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
  };

  return <ButtonUI onClick={onClickLoginGithub} text="login with Github" />;
};
