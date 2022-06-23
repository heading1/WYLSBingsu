import GithubOAuth from './GithubOAuth';
import CustomForm from '@/common/form-component/CustomForm';

const LoginForm: React.FC = () => {
  const onSubmit = (data) => {
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
