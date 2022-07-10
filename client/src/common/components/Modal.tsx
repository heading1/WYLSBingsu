import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ open: boolean }>`
  opacity: ${(props) => (props.open ? 1 : 1)};
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalStyled = styled.div<{ open: boolean }>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  left: 0;
  top: ${(props) => (props.open ? '0' : '-15%')};
  width: 95%;
  height: 10%;
  transition: all 0.2s linear;
  background-color: rgba(255, 255, 255);
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.5);

  margin: 2%;
  border-radius: 20px;
  z-index: 2;
`;

const ButtonStyled = styled.button`
  height: 90%;
  width: 20%;
  border-radius: 20px;
  /* background-color: rgba(0, 0, 0, 0.2); */
`;

const ContentStyled = styled.div`
  height: 120%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-right: 1px solid;
  & > pre {
    font-size: large;
  }
`;

interface ModalProps {
  content: string;
  setOpen: Function;
  open: boolean;
  afterClose?: Function;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { content, setOpen, open, afterClose } = props;

  const handleClose = () => {
    setOpen(false);
    if (afterClose) {
      // 모달창 올라가는 시간
      setTimeout(() => {
        afterClose();
      }, 200);
    }
  };

  return (
    <Wrapper open={open}>
      <ModalStyled open={open}>
        <ContentStyled>
          <pre>{content}</pre>
        </ContentStyled>
        <ButtonStyled onClick={handleClose}>확인</ButtonStyled>
      </ModalStyled>
    </Wrapper>
  );
};

export default Modal;
