import React from 'react';
import { Wrapper, Tooltip, NavButton } from './HeaderStyle';
import { topping, home, share } from '@/assets/images';

const Header: React.FC = () => {
  return (
    <Wrapper>
      <article>
        <h2>bingsu</h2>
      </article>
      <nav>
        <NavButton>
          <Tooltip>내 빙수가기</Tooltip>
          <img src={home} alt="내 빙수가기" />
        </NavButton>
        <NavButton>
          <Tooltip>토핑올리기</Tooltip>
          <img src={topping} alt="토핑올리기" />
        </NavButton>
        <NavButton>
          <Tooltip>공유하기</Tooltip>
          <img src={share} alt="공유하기" />
        </NavButton>
      </nav>
    </Wrapper>
  );
};

export default Header;
