import React from 'react';
import { LinkBtn, StyledHeader } from './index.style';
import bingsu from '../../assets/images/bingsu.jpeg';

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <p>안녕하세요.</p>
      <LinkBtn>버튼</LinkBtn>
    </StyledHeader>
  );
};

export default Header;
