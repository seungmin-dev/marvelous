import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Logo = styled.img`
  max-width: 200px;
  padding: 20px 0 20px 40px;
`;
export const MenuWrapper = styled.div`
  padding: 20px 20px 20px 40px;
`;
export const TabWrapper = styled.div``;
export const Tab = styled.ul`
  padding: 20px 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.grayColor}`};
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const Item = styled.li`
  cursor: pointer;
  font-size: 20px;
  display: flex;
  gap: 5px;
`;
export const ItemLink = styled.span`
  color: ${({ theme, isActive }: { isActive: boolean }) =>
    isActive ? theme.activeColor : theme.textColor};
  transition: 0.2s all ease 0s;
  :hover {
    color: ${({ theme }) => theme.activeColor};
  }
`;
export const MenuIcon = styled.span`
  margin-right: 10px;
  width: 20px;
  text-align: center;
`;
export const MenuTitle = styled.span``;
export const ProfileWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  gap: 15px;
`;
export const ProfileImg = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 100%;
  border: 1px solid black;
`;
export const ProfileName = styled.span`
  font-size: 22px;
  flex-grow: 1;
  a {
    color: ${({ theme }) => theme.textColor};
  }
`;
export const Icon = styled.span`
  cursor: pointer;
  svg {
    width: 30px;
  }
`;
