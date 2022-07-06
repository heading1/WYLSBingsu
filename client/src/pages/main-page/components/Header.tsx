import React, { useEffect } from 'react';
import { Wrapper, Tooltip, NavButton } from './HeaderStyle';
import { topping, home, share, logout } from '@/assets/images';
import shareMyLink from '../hooks/useShareMyLink';
import { useNavigate, useParams } from 'react-router-dom';

interface HeaderProps {
  getMyLink: Function;
  setBtnType: Function;
  info: any;
  getLogout: Function;
  isLogin: boolean;
  setModal: Function;
}

const Header: React.FC<HeaderProps> = ({
  getMyLink,
  setBtnType,
  info,
  getLogout,
  isLogin,
  setModal,
}) => {
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
    navigator.clipboard.writeText(location.href).then(() =>
      setModal({
        content: '빙수의 링크가 복사되었습니다.\n친구들에게 공유해보세요!',
        flag: true,
      })
    );
  };

  const handleLogoutClick = () => {
    setBtnType('logout');
    getLogout();
  };

  return (
    <Wrapper>
      <article>
        <h2>{info ? `${info}의 빙수` : `BINGSU`}</h2>
      </article>
      <nav>
        <NavButton>
          <Tooltip>내 빙수</Tooltip>
          <img src={home} alt="내 빙수가기" onClick={handleHomeClick} />
        </NavButton>
        <NavButton>
          <Tooltip>토핑올리기</Tooltip>
          <img src={topping} alt="토핑올리기" onClick={handleToppingClick} />
        </NavButton>
        {isLogin && (
          <>
            <NavButton>
              <Tooltip>공유하기</Tooltip>
              <img src={share} alt="공유하기" onClick={handleShareClick} />
            </NavButton>
            <NavButton>
              <Tooltip>로그아웃</Tooltip>
              <img src={logout} alt="공유하기" onClick={handleLogoutClick} />
            </NavButton>
          </>
        )}
      </nav>
    </Wrapper>
  );
};

export default Header;
