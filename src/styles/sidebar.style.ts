import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Logo = styled.img`
  width: 200px;
  padding: 20px 0 20px 40px;
`;
export const MenuWrapper = styled.div`
  padding: 20px 0 20px 40px;
`;
export const TabWrapper = styled.div``;
export const Tab = styled.ul`
  padding: 20px 0;
  border-bottom: 1px solid #dfdfdf;
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
  border-radius: 100%;
  border: 1px solid black;
`;
export const ProfileName = styled.span`
  font-size: 22px;
  flex-grow: 1;
`;
export const Icon = styled.span`
  cursor: pointer;
  svg {
    width: 30px;
  }
`;
