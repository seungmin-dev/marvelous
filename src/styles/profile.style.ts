import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
`;
export const ProfileBox = styled.div`
  width: inherit;
  height: 20vh;
  background-color: red;
  box-sizing: border-box;
  @media (max-width: 800px) {
    margin-top: 80px;
  }
`;
export const InnerWrapper = styled.div`
  width: 100%;
  height: auto;
`;
export const UserBox = styled.div`
  width: 100%;
  height: 20vh;
  position: sticky;
  top: 0;
  left: 0;
  @media (max-width: 800px) {
    top: 80px;
  }
  display: flex;
  flex-direction: column;
  gap: 25px;
  box-sizing: border-box;
  padding: 10px 30px;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-bottom: ${({ theme }) => `1px solid ${theme.grayColor}`};
`;
export const UserHeader = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const UserProfilePic = styled.img`
  height: 100%;
  aspect-ratio: 1/1;
`;
export const UserName = styled.h2`
  font-size: 30px;
`;
export const PostBox = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
export const MenuList = styled.ul`
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: space-between;
`;
export const Menu = styled.li`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  color: ${({ theme, isActive }: { isActive: boolean }) =>
    isActive ? theme.textColor : theme.grayColor};
`;
export const PostList = styled.div`
  width: 100%;
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
