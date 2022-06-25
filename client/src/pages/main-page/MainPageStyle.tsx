import styled from 'styled-components';

const Wrapper = styled.div`
  /* height: 99vh; */
  width: 100vw;
  text-align: center;
  & > div {
    position: relative;
    display: inline-block;
    height: 99vh;
    overflow: hidden;
    z-index: -1;
  }
  & > img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Wrapper;
