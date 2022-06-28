import axios, { AxiosError } from 'axios';
import { FormInputType } from '@/types/types';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URI = `http://localhost:8070/user/login`;

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const useLogin = () => {
  const [error, setError] = useState<Error['message']>('');
  const [result, setResult] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const asyncLogin = useCallback((data: FormInputType) => {
    setLoading(true);
    axios
      .post<LoginResponse>(URI, data)
      .then((response) => {
        console.log('then');
        setResult('OK');
        navigate('/');
      })
      .catch((err: AxiosError) => {
        console.log('catch');
        setError(err.message);
      })
      .finally(() => {
        console.log('finally');
        setLoading(false);
      });
  }, []);

  return { asyncLogin, error, result, isLoading };
};

export default useLogin;
