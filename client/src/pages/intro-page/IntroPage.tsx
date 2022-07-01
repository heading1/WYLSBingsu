import {
  Wrapper,
  IntroHeader,
  LinkButton,
  ButtonWrapper,
  IntroImg,
} from './IntroPageStyle';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import { Link, useNavigate } from 'react-router-dom';
import { pixelBingsu } from '@/assets/images';
import { useEffect } from 'react';
import axios from 'axios';

const IntroPage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8070/user/link', { withCredentials: true })
      .then((response) => {
        console.log(response);
        if (response?.data) {
          navigate(`/${response.data}`, { replace: true });
        }
      })
      .catch(() => {
        console.log('WELCOME TO BINGSU WORLD!');
      });
  }, []);

  return (
    <Wrapper deviceHeight={deviceHeight}>
      <IntroHeader>
        WELCOME TO <strong>BINGSU</strong> WORLD!
      </IntroHeader>
      <IntroImg src={pixelBingsu} />
      <ButtonWrapper>
        <Link to="/login">
          <LinkButton>로그인</LinkButton>
        </Link>
        <span>OR</span>
        <Link to="/register">
          <LinkButton to="register">회원가입</LinkButton>
        </Link>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default IntroPage;
