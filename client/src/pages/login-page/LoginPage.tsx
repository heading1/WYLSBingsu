import LoginForm from './components/LoginForm';
import { Wrapper, RegisterLink } from './LoginPageStyle';

const LoginPage: React.FC = () => {
  return (
    <Wrapper>
      <LoginForm />
      <p>
        <span>혹시 회원이 아니신가요?</span>
        <RegisterLink to="/register">회원가입</RegisterLink>
      </p>
    </Wrapper>
  );
};

export default LoginPage;
