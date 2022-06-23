import styled from 'styled-components';

const Wrapper = styled.section`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  border: 1px solid;
  & > div {
    margin: 5%;
  }
`;

export default Wrapper;
