import styled from 'styled-components';
import { DeviceViewport } from '@/types/interfaces';
interface WrapperInterface extends DeviceViewport {
  $loading: boolean;
}

const Wrapper = styled.div<WrapperInterface>`
  height: ${(props) => (props.$loading ? props.deviceHeight : '')};
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: center;

  & > div {
    position: absolute;
    display: inline-block;
    height: ${(props) => props.deviceHeight};
    overflow: hidden;
    z-index: -1;
  }
  & > img {
    display: block;
    top: 0;
    left: 0;
  }
`;

export default Wrapper;
