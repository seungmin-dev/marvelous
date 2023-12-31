import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
export const LeftBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  @media (max-width: 800px) {
    display: none;
  }
`;
export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const RightBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  align-items: center;
`;
export const InnerWrapper = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding-left: 30px;
`;
export const SignupWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
`;
export const TextWrapper = styled.div`
  width: 100%;
  height: auto;
`;
export const Title = styled.h1`
  color: white;
  font-size: 50px;
`;
export const Text = styled.span`
  color: white;
  font-size: 20px;
  line-height: 1.5;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FsErrorText = styled.span`
  color: white;
  font-weight: bold;
`;
export const LoginWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
`;
export const Icon = styled.div`
  color: white;
  cursor: pointer;
  svg {
    width: 30px;
  }
`;
export const RegisterText = styled.span`
  margin-top: 10px;
  color: white;
  cursor: pointer;
  :hover {
    color: #ef151e;
    text-decoration: underline;
    font-style: italic;
  }
`;
