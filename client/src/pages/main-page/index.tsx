import styled from 'styled-components';
import React from 'react';
import backgroundImg from '../../assets/images/bingsu.jpeg';
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
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
        <MainLayout>메인입니다.</MainLayout>
        <FooterLayout>푸터입니다.</FooterLayout>
      </div>
    </Wrapper>
  );
};

export default MainPage;
