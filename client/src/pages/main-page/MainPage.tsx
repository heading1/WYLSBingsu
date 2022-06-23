import React from 'react';
import backgroundImg from '../../assets/images/bingsu.jpeg';
import { Main, Header, Footer } from './components';

import Wrapper from './MainPageStyle';

const MainPage: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <img src={backgroundImg} />
        <Header />
        <Main />
        <Footer />
      </div>
    </Wrapper>
  );
};

export default MainPage;
