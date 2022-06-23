import { FormInputType } from '@/types/types';
import CustomForm from '@/common/form-component/CustomForm';

interface RegisterProps {
  emailCertificate: React.Dispatch<React.SetStateAction<boolean>>;
  sendingStatus: boolean;
}

const RegisterForm: React.FC<RegisterProps> = ({
  emailCertificate,
  sendingStatus,
}) => {
  const onSubmit = (data: FormInputType) => {
    console.log(data);
    emailCertificate(true);
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <button type="submit">
        {!sendingStatus ? '회원가입' : '이메일이 전송됐습니다.'}
      </button>
    </CustomForm>
  );
};

export default RegisterForm;
