import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SearchBar from "./search-bar";

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
const Icon = styled.span`
  cursor: pointer;
  color: #ccc;
  font-size: 24px;
`;

export const MobileHeader = () => {
  const [clickSearch, setClickSearch] = useState(false);
  const [isMobile, setMobile] = useState(false);

  const onClickSearch = () => {
    setClickSearch((prev) => !prev);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) setMobile(true);
    else setMobile(false);
  };
  window.addEventListener("resize", handleResize);
  useEffect(() => {
    // width가 800이 넘으면 false
    const mediaQuery = window.matchMedia("(max-width: 800px)").matches;
    setMobile(mediaQuery);
  }, []);

  return (
    <>
      <Wrapper>
        <Logo src="/src/assets/logo.png" />
        <Icon onClick={onClickSearch}>
          {clickSearch ? (
            <FontAwesomeIcon icon={faCircleXmark} />
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          )}
        </Icon>
      </Wrapper>
      {isMobile ? clickSearch ? <SearchBar /> : null : null}
    </>
  );
};
