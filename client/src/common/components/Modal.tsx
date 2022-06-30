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
  overflow: scroll;
  border-right: 1px solid;
`;

interface ModalProps {
  content: string;
  setOpen: Function;
  open: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { content, setOpen, open } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper open={open}>
      <ModalStyled open={open}>
        <ContentStyled>
          <span>{content}</span>
        </ContentStyled>
        <ButtonStyled onClick={handleClose}>닫기</ButtonStyled>
      </ModalStyled>
    </Wrapper>
  );
};

export default Modal;
