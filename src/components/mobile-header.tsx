import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 80px;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: 800px) {
    display: flex;
  }
`;
const Logo = styled.img`
  height: 80%;
  width: auto;
`;
const Icon = styled.span`
  cursor: pointer;
  color: #ccc;
  font-size: 24px;
`;

export const MobileHeader = () => {
  return (
    <Wrapper>
      <Logo src="/src/assets/logo.png" />
      <Icon>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Icon>
    </Wrapper>
  );
};
