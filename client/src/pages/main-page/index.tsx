import styled from 'styled-components';
import React from 'react';
import backgroundImg from '../../assets/images/bingsu.jpeg';
import riceCakeImg from '../../assets/images/riceCake.png';
import Header from './components/Header';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  text-align: center;

  & > div {
    position: relative;
    display: inline-block;
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    height: 100vh;
    overflow: hidden;
    z-index: -1;
  }

  & > img {
    display: block;
  }
`;

const HeaderLayout = styled.section`
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

const MainLayout = styled.section`
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
  & > div:nth-child(7) {
    grid-area: g;
  }
  & > div:nth-child(8) {
    grid-area: h;
  }
  & > div:nth-child(9) {
    grid-area: i;
  }
`;

const FooterLayout = styled.section`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
  border: 1px solid;
`;

const MainPage: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <img src={backgroundImg} />
        <HeaderLayout>
          <div>
            <span>안녕하세요</span>
          </div>
          <div>
            <button>버튼</button>
            <button>버튼</button>
            <button>버튼</button>
          </div>
        </HeaderLayout>
        <MainLayout>
          <div>
            <img src={riceCakeImg} />
          </div>
          <div>
            <img src={riceCakeImg} />
          </div>
          <div>
            <img src={riceCakeImg} />
          </div>
          <div>
            <img src={riceCakeImg} />
          </div>
          <div>
            <img src={riceCakeImg} />
          </div>
          <div>
            <img src={riceCakeImg} />
          </div>
        </MainLayout>
        <FooterLayout>푸터입니다.</FooterLayout>
      </div>
    </Wrapper>
  );
};

export default MainPage;
