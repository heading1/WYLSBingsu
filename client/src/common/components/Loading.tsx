import { theme } from '@/styles';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import {
  watermelon,
  chocolate1,
  chocolate2,
  chocolate3,
  chocolate4,
  kiwi,
  pineapple,
} from '@/assets/images';
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100vw;
  z-index: 5;
`;

const spin = keyframes`
  to{
    transform: rotate(360deg);
  }
`;

// const LoadingSpinner = styled.div`
//   position: absolute;
//   display: block;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   margin: auto;
//   width: 50px;
//   height: 50px;
//   border: 7px solid ${theme.point4};
//   border-radius: 50%;
//   border-top-color: ${theme.point2};
//   animation: ${spin} 1s linear infinite;
//   z-index: 6;
// `;
const upside = keyframes`
    0%,
    100% {
      transform: translateY(0px) ;
    }
    50% {
      transform: translateY(-15px) ;
    }
    
`;

const StyledLoading = styled.div`
  position: absolute;
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  & > img {
    margin-left: 20%;
  }
  & > img:nth-child(1) {
    animation: ${upside} 0.7s infinite;
    animation-delay: 100ms;
  }
  & > img:nth-child(2) {
    animation: ${upside} 0.7s infinite;
    animation-delay: 225ms;
  }
  & > img:nth-child(3) {
    animation: ${upside} 0.7s infinite;
    animation-delay: 350ms;
  }
  & > img:nth-child(4) {
    animation: ${upside} 0.7s infinite;
    animation-delay: 500ms;
  }
`;

const imageArr = [
  watermelon,
  chocolate1,
  chocolate2,
  chocolate3,
  chocolate4,
  kiwi,
  pineapple,
];

const randomImage = () => imageArr[Math.floor(Math.random() * imageArr.length)];
const a = randomImage();
const b = randomImage();
const c = randomImage();
const Loading: React.FC = () => {
  return (
    <Wrapper>
      <StyledLoading>
        <img src={a} />
        <img src={b} />
        <img src={c} />
      </StyledLoading>
    </Wrapper>
  );
};

export default Loading;
