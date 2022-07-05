import Wrapper from './RegisterPageStyle';
import RegisterForm from './components/RegisterForm';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';

const RegisterPage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();

  return (
    <Wrapper deviceHeight={deviceHeight}>
      <RegisterForm />
    </Wrapper>
  );
};

export default RegisterPage;
