import { CodeInput, SubmitButton } from './EmailCertificationFormStyle';

const EmailCertificationForm: React.FC = () => {
  return (
    <>
      <CodeInput type="text" placeholder="인증코드 입력" />
      <SubmitButton>인증</SubmitButton>
    </>
  );
};

export default EmailCertificationForm;
