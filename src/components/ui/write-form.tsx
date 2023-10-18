import styled from "@emotion/styled";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonUI2 } from "./button-ui-2";

library.add(faImage);

const WriteFormWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;
const Form = styled.form``;
const Textarea = styled.textarea`
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
const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Icon = styled.span`
  font-size: 30px;
  padding-left: 10px;
`;

export const WriteForm = () => {
  const [loading, setLoading] = useState(false);
  const [onComplete, setComplete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onChangeTextarea = () => {
    if ((textareaRef.current?.value.length as number) > 0) setComplete(true);
  };
  const submitPost = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const user = auth.currentUser;
    setLoading(true);

    try {
      const doc = await addDoc(collection(db, "posts"), {
        post: textareaRef.current?.value,
        createdAt: Date.now(),
        username: user?.displayName,
        userId: user?.uid,
        userphoto: user?.photoURL,
      });
      textareaRef.current!.value = "";
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <WriteFormWrapper>
      <Form onSubmit={submitPost}>
        <Textarea
          placeholder="What's on your mind...?"
          ref={textareaRef}
          onChange={onChangeTextarea}
        />
        <ButtonWrapper>
          <Icon>
            <FontAwesomeIcon icon={faImage} />
          </Icon>
          <ButtonUI2
            type="submit"
            text={loading ? "loading" : "Post"}
            onComplete={onComplete}
          />
        </ButtonWrapper>
      </Form>
    </WriteFormWrapper>
  );
};
