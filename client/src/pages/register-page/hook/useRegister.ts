import axios, { AxiosError } from 'axios';
import { RegisterInputType } from '@/types/interfaces';
import { useCallback, useState } from 'react';

type EmailValidationResponse = {
  message: string;
};

const useRegister = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const emailValidationURI = `${process.env}/user/mail`;
  const registerURI = `${process.env}/user/register`;

  // step1: email로만 요청을 보내 인증 번호 메일 전송 상태 응답을 받는다.
  const emailValidation = useCallback(({ email }: RegisterInputType) => {
    setLoading(true);
    axios
      .post(emailValidationURI, { email }, { withCredentials: true })
      .then((response) => {
        console.log('then', response);
        setError('');
        setShowError(false);
        setIsSend(true);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log('catch', err);
          const responseError = err as AxiosError<EmailValidationResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.message);
            setShowError(true);
            setIsSend(false);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // step2: 인증번호를 포함한 모든 data로 회원가입 요청을 보낸다.
  const registerRequest = useCallback((data: RegisterInputType) => {
    setLoading(true);
    axios
      .post(registerURI, data, { withCredentials: true })
      .then((response) => {
        console.log('then', response.data);
        setError('');
        setShowError(false);
        setIsSuccess(true);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log('catch', err);
          const responseError = err as AxiosError<EmailValidationResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.message);
            setShowError(true);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    isLoading,
    isSend,
    emailValidation,
    registerRequest,
    error,
    isSuccess,
    showError,
  };
};

export default useRegister;
