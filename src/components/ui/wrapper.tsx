import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  padding: 10px 20px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 800px) {
    padding-top: 100px;
  }
`;
export const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
  padding-top: 10px;
`;

export const WrapperUI = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <Wrapper>
      {title ? <Title>{title}</Title> : null}
      {children}
    </Wrapper>
  );
};
