import { Wrapper, InfoDiv, HomeLink } from './ErrorPageStyle';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';

const ErrorPage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();

  return (
    <Wrapper deviceHeight={deviceHeight}>
      <InfoDiv>
        <h1>
          Bingsu <strong>NOT</strong> FOUND!
        </h1>
        <p>빙수가 녹아버렸습니다!</p>
        <p>다시 빙수로 돌아가주세요.</p>
        <HomeLink to="/">GO HOME</HomeLink>
      </InfoDiv>
    </Wrapper>
  );
};

export default ErrorPage;
