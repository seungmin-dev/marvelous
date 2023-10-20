import styled from "@emotion/styled";

export const PostWrapper = styled.div`
  width: 100%;
  height: 90vh;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 10px 20px;
`;
export const BlankWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  padding-top: 30%;
  justify-content: center;
`;
export const Text = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.grayColor};
  font-size: 24px;
`;
