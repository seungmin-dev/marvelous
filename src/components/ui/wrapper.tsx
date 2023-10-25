import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  @media (max-width: 800px) {
    padding-top: 80px;
  }
`;
export const TitleWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0 20px 20px;
  background-color: ${({ theme }) => theme.backgroundColor};
  position: sticky;
`;
export const Title = styled.h2`
  font-size: 30px;
`;
export const InnerWrapper = styled.div`
  box-sizing: border-box;
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
      {title ? (
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
      ) : null}
      {children}
    </Wrapper>
  );
};
