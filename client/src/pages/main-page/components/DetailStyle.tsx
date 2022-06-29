import { DeviceViewport } from '@/types/interfaces';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<DeviceViewport>`
  position: absolute;
  width: 90%;
  max-width: 468px;
  border-radius: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
  background-color: aliceblue;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export { Wrapper, Background };
