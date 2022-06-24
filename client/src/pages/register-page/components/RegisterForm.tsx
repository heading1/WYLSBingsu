import { FormInputType } from '@/types/types';
import CustomForm from '@/common/form-component/CustomForm';
import { RegisterButton } from './RegisterFormStyle';
import { useEffect, useRef } from 'react';

interface RegisterProps {
  emailCertificate: React.Dispatch<React.SetStateAction<boolean>>;
  sendingStatus: boolean;
}

const RegisterForm: React.FC<RegisterProps> = ({
  emailCertificate,
  sendingStatus,
}) => {
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const onSubmit = (data: FormInputType) => {
    console.log(data);
    emailCertificate(true);
  };

  useEffect(() => {
    buttonRef.current.disabled = sendingStatus;
  }, [sendingStatus]);

  return (
    <CustomForm onSubmit={onSubmit}>
      <RegisterButton type="submit" isDisabled={sendingStatus} ref={buttonRef}>
        {!sendingStatus ? '회원가입' : '이메일이 전송됐습니다.'}
      </RegisterButton>
    </CustomForm>
  );
};

export default RegisterForm;
