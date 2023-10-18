import styled from "@emotion/styled";
import { WriteForm } from "../components/ui/write-form";
import { PostList } from "../components/posts-list";

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  padding: 20px;
  margin: 0 auto;
`;

export const Home = () => {
  return (
    <Wrapper>
      <WriteForm />
      <PostList />
    </Wrapper>
  );
};
