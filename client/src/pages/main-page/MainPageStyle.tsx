import styled from 'styled-components';

const Wrapper = styled.div`
  /* height: 99vh; */
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: center;
  & > div {
    position: absolute;
    display: inline-block;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
  }
  & > img {
    display: block;
    /* position: relative; */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Wrapper;
