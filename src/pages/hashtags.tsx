import styled from "@emotion/styled";
import { hashtagData } from "../commons/hashtagData";
import { WrapperUI } from "../components/ui/wrapper";

const HashtagWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
const Hashtag = styled.a`
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
          <Hashtag href={`/hashtaging?${hashtag}`}>#{hashtag}</Hashtag>
        ))}
      </HashtagWrapper>
    </WrapperUI>
  );
}
