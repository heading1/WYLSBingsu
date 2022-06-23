import GithubOAuth from './GithubOAuth';
import CustomForm from '@/common/form-component/CustomForm';
import { FormInputType } from '@/types/types';

const LoginForm: React.FC = () => {
  const onSubmit = (data: FormInputType) => {
    console.log(data);
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <button type="submit">Login</button>
      <GithubOAuth />
    </CustomForm>
  );
};

export default LoginForm;
