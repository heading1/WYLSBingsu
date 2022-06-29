import { FormInputType } from '@/types/types';
import CustomForm from '@/common/form-component/CustomForm';
import { RegisterButton } from './RegisterFormStyle';
import { useEffect, useRef } from 'react';
import useRegister from '../hook/useRegister';
import EmailCertificationForm from '../components/EmailCertificationForm';

const RegisterForm: React.FC = () => {
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const { isSend, emailValidation, showError, error } = useRegister();

  const onSubmit = (data: FormInputType) => {
    emailValidation(data);
  };

  useEffect(() => {
    buttonRef.current.disabled = isSend;
  }, [isSend]);

  return (
    <CustomForm
      onSubmit={onSubmit}
      header="REGISTER IN BINGSU"
      registerMode={true}
    >
      {showError && <p>{error}</p>}
      <RegisterButton type="submit" isDisabled={isSend} ref={buttonRef}>
        {!isSend ? '회원가입' : '이메일이 전송됐습니다.'}
      </RegisterButton>
      {isSend && <EmailCertificationForm />}
    </CustomForm>
  );
};

export default RegisterForm;
