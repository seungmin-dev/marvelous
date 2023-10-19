import styled from "@emotion/styled";
import { hashtagData } from "../commons/hashtagData";
import { WrapperUI } from "../components/ui/wrapper";
import { Link } from "react-router-dom";

const HashtagWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
const Hashtag = styled.span`
  cursor: pointer;
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 20px;
  border: ${({ theme }) => `1.5px solid ${theme.activeColor}`};
  transition: 0.2s all ease 0s;
  color: ${({ theme }) => theme.textColor};
  :hover {
    background-color: ${({ theme }) => theme.activeColor};
    color: ${({ theme }) => theme.revertedColor};
  }
`;

export default function Hashtags() {
  return (
    <WrapperUI title="Hashtags">
      <HashtagWrapper>
        {hashtagData.map((hashtag) => (
          <Link to={`/hashtaging?${hashtag}`}>
            <Hashtag>#{hashtag}</Hashtag>
          </Link>
        ))}
      </HashtagWrapper>
    </WrapperUI>
  );
}
