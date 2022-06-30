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

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.4rem 0;
  background-color: ${(props) => props.theme.point2};
  border-radius: 2rem;
  font-size: 1.4rem;
  color: #fff;
`;

export const PageButton = styled.button`
  width: 45%;
  font-size: 1.6rem;
  border: 1px solid black;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
  max-width: 26rem;
`;
