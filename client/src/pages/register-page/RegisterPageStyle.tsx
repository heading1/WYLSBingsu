import styled from 'styled-components';
import { DeviceViewport } from '@/types/interfaces';

const Wrapper = styled.div<DeviceViewport>`
  display: flex;
  height: ${(props) => props.deviceHeight};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Wrapper;
