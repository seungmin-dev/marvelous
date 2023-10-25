import styled from "@emotion/styled";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Button = styled.div`
  position: absolute;
  bottom: 100px;
  right: 20px;
  z-index: 100;
  cursor: pointer;
  width: 70px;
  height: 70px;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.activeColor};
  color: white;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  svg {
    margin-left: 22px;
    font-size: 30px;
    font-weight: 200;
  }
`;

export const FloatButton = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate("/mobile-write");
  };

  return (
    <Button onClick={onClickButton}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </Button>
  );
};
