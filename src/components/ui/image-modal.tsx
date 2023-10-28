import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: ${({ open }: { open: boolean }) => (open ? "flex" : "none")};
`;
const Image = styled.img`
  width: 80%;
  height: auto;
`;

export const ImageModal = ({
  openModal,
  url,
  onClickWrapper,
}: {
  openModal: boolean;
  url: string;
  onClickWrapper: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <Wrapper open={openModal} onClick={onClickWrapper}>
      <Image src={url} />
    </Wrapper>
  );
};
