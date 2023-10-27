import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  padding-top: 30%;
  justify-content: center;
`;
const Text = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.grayColor};
  font-size: 24px;
`;

export const ComingSoon = () => {
  return (
    <Wrapper>
      <Text>🪜 준비 중이에요 🛠️</Text>
    </Wrapper>
  );
};
