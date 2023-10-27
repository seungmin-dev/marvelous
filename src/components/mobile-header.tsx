import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faGear,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SearchBar from "./search-bar";
import { useMobile } from "../commons/hooks/useMobile";
import { useNavigate } from "react-router-dom";
import Settings from "../pages/settings";

const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.backgroundColor};
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
const IconWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const Icon = styled.span`
  cursor: pointer;
  color: #ccc;
  font-size: 24px;
`;

export const MobileHeader = () => {
  const [clickSearch, setClickSearch] = useState(false);
  const [clickSettings, setClickSettings] = useState(false);
  const { isMobile } = useMobile();
  const navigate = useNavigate();

  const onClickSearch = () => {
    setClickSearch((prev) => !prev);
  };
  const onClickSettings = () => {
    setClickSettings((prev) => !prev);
  };

  useEffect(() => {
    setClickSearch(false);
  }, [navigate]);

  return (
    <>
      <Wrapper>
        <Logo src="/src/assets/logo.png" />
        <IconWrapper>
          <Icon onClick={onClickSearch}>
            {clickSearch ? (
              <FontAwesomeIcon icon={faCircleXmark} />
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            )}
          </Icon>
          <Icon onClick={onClickSettings}>
            <FontAwesomeIcon icon={faGear} />
          </Icon>
        </IconWrapper>
      </Wrapper>
      {isMobile ? clickSearch ? <SearchBar /> : null : null}
      {isMobile ? clickSettings ? <Settings /> : null : null}
    </>
  );
};
