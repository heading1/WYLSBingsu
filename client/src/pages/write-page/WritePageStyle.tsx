import styled from 'styled-components';
import { DeviceViewport } from '@/types/interfaces';

export const Wrapper = styled.div<DeviceViewport>`
  display: flex;
  height: ${(props) => props.deviceHeight};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SubmitButton = styled.button`
  width: 24rem;
  margin-top: 2rem;
  padding: 0.4rem 0;
  background-color: ${(props) => props.theme.point2};
  border-radius: 2rem;
  font-size: 1.4rem;
  color: #fff;
`;
