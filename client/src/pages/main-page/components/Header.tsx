import React, { useEffect } from 'react';
import { Wrapper, Tooltip, NavButton } from './HeaderStyle';
import { topping, home, share } from '@/assets/images';
import shareMyLink from '../hooks/useShareMyLink';
import { useNavigate, useParams } from 'react-router-dom';

interface HeaderProps {
  getMyLink: Function;
  setBtnType: Function;
  info: any;
}

const Header: React.FC<HeaderProps> = ({ getMyLink, setBtnType, info }) => {
  let navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;

  const handleHomeClick = () => {
    setBtnType('home');
    getMyLink();
  };

  const handleToppingClick = () => {
    navigate(`/${userId}/write`);
  };

  const handleShareClick = () => {
    setBtnType('share');
    getMyLink();
  };

  return (
    <Wrapper>
      <article>
        <h2>{info ? `${info}의 빙수` : `BINGSU`}</h2>
      </article>
      <nav>
        <NavButton>
          <Tooltip>내 빙수가기</Tooltip>
          <img src={home} alt="내 빙수가기" onClick={handleHomeClick} />
        </NavButton>
        <NavButton>
          <Tooltip>토핑올리기</Tooltip>
          <img src={topping} alt="토핑올리기" onClick={handleToppingClick} />
        </NavButton>
        <NavButton>
          <Tooltip>공유하기</Tooltip>
          <img src={share} alt="공유하기" onClick={handleShareClick} />
        </NavButton>
      </nav>
    </Wrapper>
  );
};

export default Header;
