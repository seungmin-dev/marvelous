import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;
const Img = styled.img`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;
const TitleWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
`;
const Title = styled.h2`
  text-align: center;
  padding-top: 30%;
`;

export default function NotFound() {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>오류가 발생했어요 🤯</Title>
      </TitleWrapper>
      <Img src="/src/assets/error.jpg" />
    </Wrapper>
  );
}
