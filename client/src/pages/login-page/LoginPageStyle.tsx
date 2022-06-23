import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RegisterLink = styled(Link)`
  margin-left: 1rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.point2};
`;
