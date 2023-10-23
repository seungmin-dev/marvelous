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
  box-sizing: border-box;
  @media (max-width: 800px) {
    margin-top: 80px;
  }
  position: relative;
`;
export const ProfileBgEditButton = styled.label`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  mix-blend-mode: difference;
  svg {
    color: white;
  }
`;
export const UserProfilePicWrapper = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  box-sizing: border-box;
  border-radius: 100%;
  border: 1px solid black;
  position: relative;
`;
export const ProfilePicEditButton = styled.label`
  cursor: pointer;
  position: absolute;
  width: 25px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.revertedColor};
  border-radius: 100%;
  border: ${({ theme }) => `1px solid ${theme.textColor}`};
  svg {
    color: ${({ theme }) => theme.textColor};
  }
`;

export const ProfileBgImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const InnerWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 80vh;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 5px 15px;
`;
export const UserBox = styled.div`
  width: 100%;
  height: ${({ isObject }: { isObject: boolean }) =>
    isObject ? "15vh" : "20vh"};
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
  height: ${({ isObject }: { isObject: boolean }) =>
    isObject ? "100%" : "65%"};
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const UserProfilePic = styled.img`
  height: 100%;
  aspect-ratio: 1/1;
  box-sizing: border-box;
  border-radius: 100%;
  border: 1px solid black;
`;
export const UserName = styled.h2`
  font-size: 30px;
  flex-grow: 1;
`;
export const Icon = styled.span`
  cursor: pointer;
  svg {
    width: 18px;
  }
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
export const FollowItem = styled.div`
  width: 100%;
  height: 100px;
  padding: 20px 0;
  display: flex;
  gap: 20px;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.grayColor}`};
`;
export const FollowingUserImg = styled.img`
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 100%;
  box-sizing: border-box;
  border: 1px solid black;
`;
export const FollowingUserName = styled.span`
  font-size: 18px;
  flex-grow: 1;
  color: ${({ theme }) => theme.textColor};
`;
export const FollowingButton = styled.span`
  cursor: pointer;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.activeColor};
  border-radius: 10px;
  color: white;
  font-weight: bold;
  :hover {
    background-color: ${({ theme }) => theme.inActiveColor};
  }
`;
