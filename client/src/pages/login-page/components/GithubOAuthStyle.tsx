import styled from 'styled-components';

const Wrapper = styled.button`
  display: flex;
  width: 100%;
  height: 2.6rem;
  border-radius: 2.6rem;
  justify-content: center;
  align-items: center;
  background-color: #272727;
  color: #fff;
  font-size: 1.2rem;
  opacity: 0.7;
  transition: opacity 0.3s linear;
  cursor: not-allowed;

  &:hover {
    opacity: 1;
  }
`;

export default Wrapper;
