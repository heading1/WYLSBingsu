import { CodeInput, SubmitButton } from './EmailCertificationFormStyle';
import { useState } from 'react';
import { RegisterInputType } from '@/types/interfaces';
import generateRandomName from '@/common/utils/generateRandomName';

interface EmailProps {
  inputData: RegisterInputType;
  registerRequest: (data: RegisterInputType) => void;
}

const EmailCertificationForm: React.FC<EmailProps> = ({
  inputData,
  registerRequest,
}) => {
  const [authValue, setAuthValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthValue(event.target.value);
  };

  const handleClick = () => {
    let registerData = { ...inputData, emailAuthNumber: authValue };
    if (!registerData.nickName) {
      registerData = { ...registerData, nickName: generateRandomName() };
    }
    registerRequest(registerData);
  };

  return (
    <>
      <CodeInput
        type="text"
        placeholder="인증코드 입력"
        value={authValue}
        onChange={handleChange}
      />
      <SubmitButton onClick={handleClick}>인증</SubmitButton>
    </>
  );
};

export default EmailCertificationForm;
