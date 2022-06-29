import { CodeInput, SubmitButton } from './EmailCertificationFormStyle';
import { useState } from 'react';

const EmailCertificationForm: React.FC = () => {
  const [authValue, setAuthValue] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthValue(event.target.value);
  };

  return (
    <>
      <CodeInput
        type="text"
        placeholder="인증코드 입력"
        value={authValue}
        onChange={handleChange}
      />
      <SubmitButton>인증</SubmitButton>
    </>
  );
};

export default EmailCertificationForm;
