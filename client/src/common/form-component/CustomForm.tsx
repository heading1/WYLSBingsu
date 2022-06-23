import { useForm } from 'react-hook-form';
import StyledForm from './CustomFormStyle';
import { FormInputType } from '@/types/types';

interface FormProps {
  children?: React.ReactNode;
  onSubmit: (data: FormInputType) => void;
}

const CustomForm: React.FC<FormProps> = ({ children, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputType>({ mode: 'onChange' });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <h1>
        WELCOME TO <strong>BINGSU</strong> WORLD!
      </h1>
      <div>
        <label htmlFor="emailInput">Email</label>
        <input
          id="emailInput"
          type="text"
          {...register('email', {
            required: true,
            pattern:
              /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email && errors.email.type === 'required' && (
          <p>이메일을 입력해주세요.</p>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <p>올바른 이메일이 아닙니다.</p>
        )}
      </div>
      <div>
        <label htmlFor="passwordInput">Password</label>
        <input
          id="passwordInput"
          type="password"
          {...register('password', {
            required: true,
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
            validate: (value) => value.length >= 8 && value.length <= 20,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>비밀번호를 입력해주세요.</p>
        )}
        {errors.password && errors.password.type === 'pattern' && (
          <p>비밀번호는 문자, 숫자, 특수문자의 조합이어야합니다.</p>
        )}
        {errors.password && errors.password.type === 'validate' && (
          <p>비밀번호의 길이는 8글자 이상 20글자 이하입니다.</p>
        )}
      </div>
      {children}
    </StyledForm>
  );
};

export default CustomForm;
