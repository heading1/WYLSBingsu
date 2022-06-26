import React from 'react';
import Wrapper from './HeaderStyle';

const Header: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <span>안녕하세요</span>
      </div>
      <div>
        <button onClick={() => alert('test')}>버튼</button>
        <button>버튼</button>
        <button>버튼</button>
      </div>
    </Wrapper>
  );
};

export default Header;
