import styled from 'styled-components';
import { DeviceViewport } from '@/types/interfaces';
import bingsuSrc from '@/assets/images/bingsu.jpeg';

export const Wrapper = styled.div<DeviceViewport>`
  display: flex;
  height: 100vh;
  max-height: ${(props) => props.deviceHeight};
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
