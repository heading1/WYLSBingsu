import styled from 'styled-components';
import { DeviceViewport } from '@/types/interfaces';
import bingsuSrc from '@/assets/images/bingsu.jpeg';

export const Wrapper = styled.div<DeviceViewport>`
  display: flex;
  height: 100vh;
  background: url(${bingsuSrc}) no-repeat center/auto 100%;
  background-color: ${(props) => props.theme.point4};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledHeader = styled.h1`
  width: 80%;
  max-width: 26rem;
  height: 2.6rem;
  border-radius: 30px;
  text-align: center;
  background-color: #fff;
`;

export const BackImg = styled.img`
  position: absolute;
  @media screen and (min-width: 450px) {
    display: none;
  }
  top: 3%;
  left: 5%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  :hover {
    transform: scale(1.3);
  }
`;
