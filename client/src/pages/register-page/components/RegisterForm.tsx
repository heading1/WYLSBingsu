import { FormInputType } from '@/types/types';
import CustomForm from '@/common/form-component/CustomForm';

const RegisterForm = () => {
  const onSubmit = (data: FormInputType) => {
    console.log(data);
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <button type="submit">회원가입</button>
    </CustomForm>
  );
};

export default RegisterForm;
