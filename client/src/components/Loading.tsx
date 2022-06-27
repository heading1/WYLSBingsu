import { theme } from '@/styles';
import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const Wrapper = styled.div`
  width: 80px;
`;

const spin = keyframes`
  to{
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  position: absolute;
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 50px;
  height: 50px;
  border: 7px solid ${theme.point4};
  border-radius: 50%;
  border-top-color: ${theme.point2};
  animation: ${spin} 1s linear infinite;
  z-index: 2;
`;

const Loading: React.FC = () => {
  return (
    <Wrapper>
      <LoadingSpinner />
    </Wrapper>
  );
};

export default Loading;
