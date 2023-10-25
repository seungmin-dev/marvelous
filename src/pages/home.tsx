import { WriteForm } from "../components/write-form";
import { PostList } from "../components/posts-list";
import { WrapperUI } from "../components/ui/wrapper";
import { useMobile } from "../commons/hooks/useMobile";

export const Home = () => {
  const { isMobile } = useMobile();
  return (
    <WrapperUI>
      {!isMobile ? <WriteForm /> : null}
      <PostList />
    </WrapperUI>
  );
};
