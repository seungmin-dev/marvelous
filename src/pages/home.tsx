import { WriteForm } from "../components/write-form";
import { PostList } from "../components/posts-list";
import { WrapperUI } from "../components/ui/wrapper";

export const Home = () => {
  return (
    <WrapperUI>
      <WriteForm />
      <PostList />
    </WrapperUI>
  );
};
