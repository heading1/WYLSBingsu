import React from 'react';
import Wrapper from './MainStyle';
import riceCakeImg from '../../../assets/images/riceCake.png';

const Main: React.FC = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Main;
