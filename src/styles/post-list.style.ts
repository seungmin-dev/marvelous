import styled from "@emotion/styled";

export const ListWrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
`;
export const Post = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 10px;
  border-bottom: 1px solid #bdbdbd;
`;
export const PostHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const PostProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;
export const PostUsername = styled.span`
  flex-grow: 1;
`;
export const PostCreatedAt = styled.span`
  font-size: 14px;
  color: #bdbdbd;
`;
export const PostContent = styled.p`
  padding: 10px 0;
`;
export const PostImgWrapper = styled.div`
  width: 100%;
  aspect-ratio: ${(props: imgWrapperProps) =>
    props.length !== 2 ? "1/1" : ""};
  margin-bottom: 20px;
`;
export const PostImg = styled.img`
  aspect-ratio: 1/ 1;
  box-sizing: border-box;
  padding: 3px;
  object-fit: cover;
  border-radius: 10px;
  width: ${(props: imgProps) =>
    props.isLast ? (props.isEven ? "50%" : "100%") : "50%"};
`;
interface imgWrapperProps {
  length: number;
}
interface imgProps {
  isEven: boolean;
  isLast: boolean;
}
export const PostButtonWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
`;
export const Icon = styled.span`
  cursor: pointer;
  font-size: 20px;
`;
