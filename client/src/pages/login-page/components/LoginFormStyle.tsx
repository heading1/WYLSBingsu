import styled from 'styled-components';

export const LoginButton = styled.button`
  width: 100%;
  height: 2.6rem;
  border: ${(props) => `1px solid ${props.theme.point2}`};
  border-radius: 2.6rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.point2};
  color: white;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s linear;

  &:hover {
    opacity: 1;
  }
`;
