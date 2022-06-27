import axios from 'axios';
import { FormInputType } from '@/types/types';
import { useCallback, useState } from 'react';

const URI = `http://localhost:8070/user/login`;

const requestLogin = async (data: FormInputType) => {
  try {
    const response = await axios.post(URI, data);
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    return err;
  }
};

const useLogin = () => {
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);

  const asyncLogin = useCallback((data: FormInputType) => {
    setLoading(true);
    requestLogin(data)
      .then((response) => {
        console.log('then');
        setResult('OK');
      })
      .catch((err) => {
        console.log('catch');
        setError(err);
      })
      .finally(() => {
        console.log('finally');
        setLoading(false);
      });
  }, []);

  return { asyncLogin, error, result, isLoading };
};

export default useLogin;

// "email": "test2@test.com",
// "password": "Test1234@"
