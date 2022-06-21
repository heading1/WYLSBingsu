import { useForm } from 'react-hook-form';

type InputType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();
  const onSubmit = (data: InputType) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        type="text"
        {...register('email', {
          required: true,
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      {errors.email && errors.email.type === 'required' && (
        <p>이메일을 입력해주세요.</p>
      )}
      {errors.email && errors.email.type === 'pattern' && (
        <p>올바른 이메일이 아닙니다.</p>
      )}
      <label>Password</label>
      <input
        type="password"
        {...register('password', {
          required: true,
          validate: (value) => value.length >= 6 && value.length <= 20,
        })}
      />
      {errors.password && errors.password.type === 'requried' && (
        <p>비밀번호를 입력해주세요.</p>
      )}
      {errors.password && errors.password.type === 'validate' && (
        <p>비밀번호의 길이는 6글자 이상 20글자 이하입니다.</p>
      )}
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
