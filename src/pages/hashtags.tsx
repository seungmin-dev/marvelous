import styled from "@emotion/styled";
import { hashtagData } from "../commons/hashtagData";

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  padding: 20px;
  margin: 0 auto;
`;
const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
`;
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
  border: 1.5px solid #ef151e;
  transition: 0.2s all ease 0s;
  :hover {
    background-color: #ef151e;
    color: white;
  }
`;

export default function Hashtags() {
  return (
    <Wrapper>
      <Title>Hashtags</Title>
      <HashtagWrapper>
        {hashtagData.map((hashtag) => (
          <Hashtag href={`/hashtaging?${hashtag}`}>#{hashtag}</Hashtag>
        ))}
      </HashtagWrapper>
    </Wrapper>
  );
}
