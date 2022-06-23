import { FormInputType } from '@/types/types';
import CustomForm from '@/common/form-component/CustomForm';

interface RegisterProps {
  emailCertificate: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterProps> = ({ emailCertificate }) => {
  const onSubmit = (data: FormInputType) => {
    console.log(data);
    emailCertificate(true);
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <button type="submit">회원가입</button>
    </CustomForm>
  );
};

export default RegisterForm;
