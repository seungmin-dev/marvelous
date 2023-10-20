import styled from "@emotion/styled";

const BlankWrapper = styled.div`
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

export const BlankUI = ({ text }: { text: string }) => {
  return (
    <BlankWrapper>
      <Text>{text}이 없어요 🧐</Text>
    </BlankWrapper>
  );
};
