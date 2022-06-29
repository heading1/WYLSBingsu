import axios, { AxiosError } from 'axios';
import { FormInputType } from '@/types/types';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import generateRandomName from '@/common/util/generateRandomName';

type EmailValidationResponse = {
  message: string;
};

const useRegister = () => {
  const [result, setResult] = useState<string>();
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const emailValidationURI = 'http://localhost:8070/user/mail';
  const registerURI = 'http://localhost:8070/user/register';
  const navigate = useNavigate();

  // step1: email로만 요청을 보내 인증 번호 메일 전송 상태 응답을 받는다.
  const emailValidation = useCallback(({ email }: FormInputType) => {
    setLoading(true);
    axios
      .post(emailValidationURI, { email }, { withCredentials: true })
      .then((response) => {
        console.log('then', response);
        setResult('OK');
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
            setResult('');
            setIsSend(false);
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
    // registerRequest,
    error,
    result,
    showError,
  };
};

export default useRegister;
