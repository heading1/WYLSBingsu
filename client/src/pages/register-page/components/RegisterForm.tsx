import { RegisterInputType } from '@/types/interfaces';
import CustomForm from '@/common/components/form-component/CustomForm';
import { RegisterButton } from './RegisterFormStyle';
import { useEffect, useRef, useState } from 'react';
import useRegister from '../hook/useRegister';
import EmailCertificationForm from './EmailCertificationForm';
import Loading from '@/common/components/Loading';
import ResponseModal from '@/common/components/response-modal/ResponseModal';

const RegisterForm: React.FC = () => {
  const MODAL_CONTENT = '이메일 인증에 성공했습니다!';
  const [inputData, setInputData] = useState<RegisterInputType>({
    email: '',
    password: '',
    nickName: '',
    emailAuthNumber: '',
  });
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const {
    emailValidation,
    registerRequest,
    isSend,
    isLoading,
    showError,
    error,
    isSuccess,
  } = useRegister();

  const onSubmit = (data: RegisterInputType) => {
    emailValidation(data);
    setInputData(data);
  };

  useEffect(() => {
    buttonRef.current.disabled = isSend;
  }, [isSend]);

  return (
    <>
      <CustomForm
        onSubmit={onSubmit}
        header="REGISTER IN BINGSU"
        registerMode={true}
        isDisabled={isSend}
      >
        {showError && <p>{error}</p>}
        <RegisterButton type="submit" isDisabled={isSend} ref={buttonRef}>
          {!isSend ? '회원가입' : '이메일이 전송됐습니다.'}
        </RegisterButton>
      </CustomForm>
      {isLoading && <Loading />}
      {isSend && (
        <EmailCertificationForm
          inputData={inputData}
          registerRequest={registerRequest}
        />
      )}
      {isSuccess && (
        <ResponseModal
          to="/login"
          content={MODAL_CONTENT}
          buttonText="로그인"
        />
      )}
    </>
  );
};

export default RegisterForm;
