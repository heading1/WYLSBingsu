import GithubOAuth from './GithubOAuth';
import CustomForm from '@/common/form-component/CustomForm';
import { FormInputType } from '@/types/types';
import { LoginButton } from './LoginFormStyle';

const LoginForm: React.FC = () => {
  const onSubmit = (data: FormInputType) => {
    console.log(data);
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <LoginButton type="submit">Login</LoginButton>
      <GithubOAuth />
    </CustomForm>
  );
};

export default LoginForm;
