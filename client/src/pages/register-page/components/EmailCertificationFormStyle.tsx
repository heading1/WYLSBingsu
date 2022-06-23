import styled from 'styled-components';

export const CodeInput = styled.input`
  width: 23rem;
  height: 2.6rem;
  border-bottom: 3px solid black;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;

  &:focus {
    border-bottom: 3px solid ${(props) => props.theme.point3};
  }
`;

export const SubmitButton = styled.button`
  width: 23rem;
  height: 2.6rem;
  border-radius: 2.6rem;
  background-color: ${(props) => props.theme.point1};
  font-size: 1.2rem;
  opacity: 0.7;
  color: #fff;
  transition: opacity 0.2s linear;

  &:hover {
    opacity: 1;
  }
`;
