import GithubOAuth from './GithubOAuth';
import CustomForm from '@/common/form-component/CustomForm';
import { FormInputType } from '@/types/types';
import { LoginButton } from './LoginFormStyle';
import Loading from '@/components/Loading';
import useLogin from '../API/useLogin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { asyncLogin, error, result, isLoading } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (data: FormInputType) => {
    asyncLogin(data);
  };

  useEffect(() => {
    if (result !== '') {
      console.log(result);
      navigate('/');
    }
  }, [error, result]);

  return (
    <>
      <CustomForm onSubmit={onSubmit}>
        <LoginButton type="submit">Login</LoginButton>
        <GithubOAuth />
      </CustomForm>
      {isLoading && <Loading />}
    </>
  );
};

export default LoginForm;
