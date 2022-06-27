import styled from 'styled-components';

interface WrapperInterface {
  loading: boolean;
}

const Wrapper = styled.div<WrapperInterface>`
  height: ${(props) => (props.loading ? '99vh' : '')};
  width: 100vw;
  background-color: ${(props) => (props.loading ? 'rgba(0, 0, 0, 0.2)' : '')};
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
