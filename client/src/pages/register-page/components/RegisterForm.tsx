import { RegisterInputType } from '@/types/interfaces';
import CustomForm from '@/common/form-component/CustomForm';
import { RegisterButton, SuccessModal } from './RegisterFormStyle';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useRegister from '../hook/useRegister';
import EmailCertificationForm from '../components/EmailCertificationForm';
import Loading from '@/components/Loading';

const RegisterForm: React.FC = () => {
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
        <SuccessModal>
          <div>
            <span>이메일 인증에 성공했습니다!</span>
            <Link to="/login">
              <button>로그인</button>
            </Link>
          </div>
        </SuccessModal>
      )}
    </>
  );
};

export default RegisterForm;
