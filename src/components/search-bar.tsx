import styled from "@emotion/styled";
import { SearchInput } from "./ui/searchInput";
import ReactPlayer from "react-player";
import { useFetchPost } from "../commons/hooks/useFetchPost";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Post } from "../types/type";
import { v4 as uuidv4 } from "uuid";
import { PostUI } from "./ui/post-ui";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 800px) {
    padding-top: 80px;
  }
`;
const SearchWrapper = styled.div`
  padding: 20px;
`;
const SearchResultWrapper = styled.div`
  padding: 0 20px 20px;
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: scroll;
`;
const HelpText = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.grayColor};
`;
const TrailerWrapper = styled.div`
  height: 30%;
  padding: 20px;
  border-top: ${({ theme }) => `1px solid ${theme.grayColor}`};
  @media (max-width: 800px) {
    display: none;
  }
`;

export default function SearchBar() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [playing, setPlaying] = useState(false);
  const [searching, setSearching] = useState(false);

  const { fetchPostsByKeyword } = useFetchPost();

  const getDebounce = _.debounce((value) => {
    fetchPostsByKeyword(value).then((result) => {
      setSearching(true);
      setPosts(result);
    });
  }, 500);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.currentTarget.value);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) setPlaying(false);
  };
  window.addEventListener("resize", handleResize);

  useEffect(() => {
    // width가 800이 넘으면 false
    const mediaQuery = window.matchMedia("(max-width: 800px)").matches;
    // 현재 환경이 PC라면 트레일러 재생
    setPlaying(!mediaQuery);
  }, []);

  return (
    <Wrapper>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search for..."
          onChange={onChangeSearch}
        />
      </SearchWrapper>
      <SearchResultWrapper>
        {searching ? (
          posts.length > 0 ? (
            posts.map((post) => <PostUI key={uuidv4()} post={post} isSearch />)
          ) : (
            <HelpText>검색 결과가 없어요 👻</HelpText>
          )
        ) : (
          <HelpText>현재 검색 기능은 단어 단위로만 가능해요 👀</HelpText>
        )}
      </SearchResultWrapper>
      <TrailerWrapper>
        <ReactPlayer
          url={"https://youtu.be/wS_qbDztgVY?si=Vg1jviV_gKY013U1"}
          playing={playing}
          loop
          width="100%"
          height="100%"
        />
      </TrailerWrapper>
    </Wrapper>
  );
}
