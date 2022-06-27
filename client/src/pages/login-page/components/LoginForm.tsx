import GithubOAuth from './GithubOAuth';
import CustomForm from '@/common/form-component/CustomForm';
import { FormInputType } from '@/types/types';
import { LoginButton } from './LoginFormStyle';
import requestLogin from '../API/requestLogin';

const LoginForm: React.FC = () => {
  const onSubmit = (data: FormInputType) => {
    requestLogin(data);
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <LoginButton type="submit">Login</LoginButton>
      <GithubOAuth />
    </CustomForm>
  );
};

export default LoginForm;
