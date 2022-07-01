import axios, { AxiosError } from 'axios';
import { FormInputType } from '@/types/interfaces';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginResponse = {
  message: string;
  userId: string;
};

const useLogin = () => {
  const [error, setError] = useState<Error['message']>('');
  const [result, setResult] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const URI = 'http://localhost:8070/user/login';

  const asyncLogin = useCallback((data: FormInputType) => {
    setLoading(true);
    axios
      .post<LoginResponse>(URI, data, { withCredentials: true })
      .then((response) => {
        setResult('OK');
        setError('');
        setShowError(false);
        navigate(`/${response.data.userId}`);
      })
      .catch((err: AxiosError | Error) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<LoginResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.message);
            setShowError(true);
            setResult('');
          }
        }
      })
      .finally(() => {
        console.log('finally');
        setLoading(false);
      });
  }, []);

  return { asyncLogin, error, result, isLoading, showError };
};

export default useLogin;
