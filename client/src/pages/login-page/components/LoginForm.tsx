import GithubOAuth from './GithubOAuth';
import CustomForm from '@/common/form-component/CustomForm';
import { FormInputType } from '@/types/types';
import { LoginButton, LoadingDiv } from './LoginFormStyle';
import Loading from '@/components/Loading';
import useLogin from '../API/useLogin';

const LoginForm: React.FC = () => {
  const { asyncLogin, isLoading } = useLogin();

  const onSubmit = async (data: FormInputType) => {
    asyncLogin(data);
  };

  return (
    <>
      <CustomForm onSubmit={onSubmit}>
        <LoginButton type="submit">Login</LoginButton>
        <GithubOAuth />
      </CustomForm>
      {isLoading && (
        <LoadingDiv>
          <Loading />
        </LoadingDiv>
      )}
    </>
  );
};

export default LoginForm;
