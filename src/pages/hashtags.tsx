import styled from "@emotion/styled";
import { hashtagData } from "../commons/hashtagData";
import { WrapperUI } from "../components/ui/wrapper";
import { Link } from "react-router-dom";

const HashtagWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  box-sizing: border-box;
`;
const Hashtag = styled.span`
  cursor: pointer;
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 20px;
  border: ${({ theme }) => `1.5px solid ${theme.activeColor}`};
  transition: 0.2s all ease 0s;
  a {
    color: ${({ theme }) => theme.textColor};
  }
  :hover {
    background-color: ${({ theme }) => theme.activeColor};
    a {
      color: ${({ theme }) => theme.revertedColor};
    }
  }
`;

export default function Hashtags() {
  return (
    <WrapperUI title="Hashtags">
      <HashtagWrapper>
        {hashtagData.map((hashtag) => (
          <Hashtag>
            <Link to={`/hashtaging?${hashtag}`}>#{hashtag}</Link>
          </Hashtag>
        ))}
      </HashtagWrapper>
    </WrapperUI>
  );
}
