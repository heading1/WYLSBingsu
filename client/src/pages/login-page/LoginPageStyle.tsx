import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DeviceViewport } from '@/types/interfaces';

export const Wrapper = styled.div<DeviceViewport>`
  display: flex;
  height: ${(props) => props.deviceHeight};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RegisterLink = styled(Link)`
  margin-left: 1rem;
  font-size: 1.3rem;
  padding-bottom: 3px;
  border-bottom: 3px solid ${(props) => props.theme.point2};
  color: ${(props) => props.theme.point2};
`;
