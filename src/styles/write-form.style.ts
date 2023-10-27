import styled from "@emotion/styled";

export const WriteFormWrapper = styled.div`
  width: 100%;
  height: 20%;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: ${({ theme }) => `1px solid ${theme.grayColor}`};
`;
export const Form = styled.form``;
export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  ::placeholder {
    color: #bdbdbd;
  }
`;
export const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
export const TempImgWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 50px;
  gap: 10px;
`;
export const TempImg = styled.img`
  aspect-ratio: 1/1;
  object-fit: cover;
  height: 100%;
  border-radius: 10px;
`;
export const Icon = styled.label`
  cursor: pointer;
  font-size: 30px;
  padding-left: 10px;
`;
export const FileInput = styled.input`
  display: none;
`;
