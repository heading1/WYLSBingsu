import styled from 'styled-components';

const Wrapper = styled.section`
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-60%, -60%);
  display: grid;
  row-gap: 10px;
  column-gap: 20px;
  width: 70%;
  /* height: 30vh; */
  grid-template-areas:
    '. . a . .'
    '. b . c . '
    'd . e . f';

  /* & > img {
    width: 90px;
  } */
  & > div {
    width: 300%;
  }
  & > div > img {
    width: 80%;
    object-fit: contain;
  }
  & > div:nth-child(1) {
    grid-area: a;
  }
  & > div:nth-child(2) {
    grid-area: b;
  }
  & > div:nth-child(3) {
    grid-area: c;
  }
  & > div:nth-child(4) {
    grid-area: d;
  }
  & > div:nth-child(5) {
    grid-area: e;
  }
  & > div:nth-child(6) {
    grid-area: f;
  }
`;

export default Wrapper;
