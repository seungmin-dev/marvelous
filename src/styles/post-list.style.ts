import styled from "@emotion/styled";

export const ListWrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  box-sizing: border-box;
  padding: 10px 20px;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
`;
export const Post = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 10px;
  border-bottom: ${({ theme }) => `1px solid ${theme.grayColor}`};
  :last-of-type {
    border: none;
  }
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
  box-sizing: border-box;
  border: 1px solid black;
`;
export const PostUsername = styled.span`
  flex-grow: ${({ myDoc }: { myDoc: boolean }) => (myDoc ? "1" : "0")};
  color: ${({ theme }) => theme.textColor};
`;
export const ButtonWrapper = styled.div`
  height: 100%;
  flex-grow: ${({ myDoc }: { myDoc: boolean }) => (myDoc ? "0" : "1")};
`;
export const Button = styled.span`
  cursor: pointer;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.activeColor};
  border-radius: 10px;
  color: white;
  font-weight: bold;
  :hover {
    background-color: ${({ theme }) => theme.inActiveColor};
  }
`;
export const PostCreatedAt = styled.span`
  font-size: 14px;
  color: #bdbdbd;
`;
export const PostContent = styled.p`
  padding: 10px 0;
`;
export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  ::placeholder {
    color: #bdbdbd;
  }
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
  display: flex;
  gap: 5px;
  align-items: center;
`;
export const HeartNum = styled.span`
  font-size: 16px;
`;
