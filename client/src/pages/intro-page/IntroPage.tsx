import {
  Wrapper,
  IntroHeader,
  LinkButton,
  ButtonWrapper,
  IntroImg,
} from './IntroPageStyle';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import { Link } from 'react-router-dom';
import { pixelBingsu } from '@/assets/images';

const IntroPage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();

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
