import styled from "@emotion/styled";

export const CommentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  box-sizing: border-box;
`;
export const CommentBox = styled.div`
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
export const CommentPost = styled.p`
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
  aspect-ratio: ${({ length }: { length: number }) =>
    length !== 2 ? "1/1" : ""};
  margin-bottom: 20px;
`;
export const PostImg = styled.img`
  aspect-ratio: 1/ 1;
  box-sizing: border-box;
  padding: 3px;
  object-fit: cover;
  border-radius: 10px;
  width: ${({ isLast, isEven }: { isLast: boolean; isEven: boolean }) =>
    isLast ? (isEven ? "50%" : "100%") : "50%"};
`;
