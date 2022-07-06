import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

type response = {
  message: string;
};

type logout = {
  createAt?: string;
  nickName?: string;
  email?: string;
  password?: string;
  userType?: string;
};

const useLogout = () => {
  const [logoutError, setLogoutError] = useState<Error['message']>('');
  const [logoutStatus, setLogoutStatus] = useState({ status: '', data: '' });
  const [isLogoutLoading, setLogoutLoading] = useState(false);
  const [isLogoutError, setIsLogoutError] = useState(false);

  const getLogout = useCallback((_id: string) => {
    const URI = `http://localhost:8070/user/logout/${_id}`;

    setLogoutLoading(true);
    axios
      .get<response>(URI, {
        withCredentials: true,
      })
      .then((response) => {
        const data = String(response.data);
        setLogoutStatus({ status: 'OK', data });
        setLogoutError('');
        setIsLogoutError(false);
      })
      .catch((err: AxiosError | Error) => {
        console.log('catch', err);
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<response>;
          setIsLogoutError(true);
          if (responseError && responseError.response) {
            setLogoutError(responseError.response.data.message);
            setLogoutStatus({ status: 'error', data: '' });
          }
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLogoutLoading(false);
        }, 400);
      });
  }, []);

  return {
    getLogout,
    logoutError,
    logoutStatus,
    isLogoutLoading,
    isLogoutError,
    setIsLogoutError,
  };
};

export default useLogout;
