import { theme } from '@/styles';
import React, { useMemo } from 'react';
import backgroundImg from '../../assets/images/bingsu.jpeg';
import { Header, Footer } from './components';

import Wrapper from './MainPageStyle';
import riceCakeImg from '@/assets/images/riceCake.png';
import Topping from './components/Topping';

const ratio = theme.windowHeight / 1000;
const location1 = { top: 15, left: 28, width: 188 * ratio };
const location2 = { top: 22, left: 50, width: 188 * ratio };
const location3 = { top: 27, left: 8, width: 188 * ratio };
const location4 = { top: 35, left: 33, width: 188 * ratio };
const location5 = { top: 38, left: 66, width: 188 * ratio };
const location6 = { top: 40, left: 0, width: 188 * ratio };

const MainPage: React.FC = () => {
  const handleClick = () => {
    return alert('test');
  };
  return (
    <Wrapper>
      <div>
        <img src={backgroundImg} />
        <Header />
        <Topping
          {...location1}
          imageSrc={riceCakeImg}
          eventClick={handleClick}
        />
        <Topping
          {...location2}
          imageSrc={riceCakeImg}
          eventClick={() => alert('test2')}
        />
        <Topping
          {...location3}
          imageSrc={riceCakeImg}
          eventClick={() => alert('test3')}
        />
        <Topping
          {...location4}
          imageSrc={riceCakeImg}
          eventClick={() => alert('test4')}
        />
        <Topping
          {...location5}
          imageSrc={riceCakeImg}
          eventClick={() => alert('test5')}
        />
        <Topping
          {...location6}
          imageSrc={riceCakeImg}
          eventClick={() => alert('test6')}
        />

        <Footer />
      </div>
    </Wrapper>
  );
};

export default MainPage;
