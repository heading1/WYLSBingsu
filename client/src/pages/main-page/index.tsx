import styled from 'styled-components';
import React from 'react';
import bingsu from '../../assets/images/bingsu.jpeg';
import Header from './components/Header';

const MainPageDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url(${bingsu});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  /* position: relative; */
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: contain;
  overflow: hidden;
  z-index: -1;
`;

const HeaderSSS = styled.div`
  position: relative;
`;

const HeaderDDD = styled.div`
  position: absolute;
  /* top: px; */
`;

const MainPage: React.FC = () => {
  return (
    <MainPageDiv>
      <BackgroundImg src={bingsu} />
      <HeaderSSS>
        <HeaderDDD>
          <p>안녕하세요</p>
          <button>버튼</button>
        </HeaderDDD>
      </HeaderSSS>

      {/* <Header /> */}
    </MainPageDiv>
  );
};

export default MainPage;
