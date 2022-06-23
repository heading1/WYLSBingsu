import Wrapper from './RegisterPageStyle';
import RegisterForm from './components/RegisterForm';
import EmailCertificationForm from './components/EmailCertificationForm';
import { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [isSend, setIsSend] = useState<boolean>(false);

  return (
    <Wrapper>
      <RegisterForm emailCertificate={setIsSend} sendingStatus={isSend} />
      {isSend && <EmailCertificationForm />}
    </Wrapper>
  );
};

export default RegisterPage;
