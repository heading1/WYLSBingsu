import { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import { Wrapper, RegisterLink } from './LoginPageStyle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
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
