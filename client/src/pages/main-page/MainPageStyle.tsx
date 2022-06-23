import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  text-align: center;
  & > div {
    position: relative;
    display: inline-block;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
  }
  & > img {
    display: block;
  }
`;

export default Wrapper;
