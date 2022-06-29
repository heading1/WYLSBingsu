import GithubOAuth from './GithubOAuth';
import CustomForm from '@/common/form-component/CustomForm';
import { FormInputType } from '@/types/interfaces';
import { LoginButton, LoadingDiv, ErrorMessage } from './LoginFormStyle';
import Loading from '@/common/components/Loading';
import useLogin from '../hook/useLogin';

const LoginForm: React.FC = () => {
  const { asyncLogin, error, isLoading, showError } = useLogin();

  const onSubmit = async (data: FormInputType) => {
    asyncLogin(data);
  };

  return (
    <>
      <CustomForm onSubmit={onSubmit}>
        <LoginButton type="submit">Login</LoginButton>
        {showError && <ErrorMessage>{error}</ErrorMessage>}
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
