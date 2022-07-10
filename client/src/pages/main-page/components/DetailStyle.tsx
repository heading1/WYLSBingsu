import { DeviceViewport } from '@/types/interfaces';
import styled, { css } from 'styled-components';

interface WrapperInterface extends DeviceViewport {
  $view: boolean;
}

const Wrapper = styled.div<WrapperInterface>`
  position: absolute;
  width: 90%;
  max-width: 468px;
  border-radius: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
  background-color: aliceblue;
  transform: all;
  transition: 0.3s linear;
  /* opacity: 1; */
  opacity: ${(props) => (props.$view ? 1 : 0)};
  margin-top: ${(props) => (props.$view ? 0 : 200)}%;
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.$view ? 'center' : 'flex-end')};
`;

const Background = styled.div<WrapperInterface>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  visibility: ${(props) => (props.$view ? '' : 'hidden')};
  /* opacity: ${(props) => (props.$view ? 1 : 0)}; */
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export { Wrapper, Background };
