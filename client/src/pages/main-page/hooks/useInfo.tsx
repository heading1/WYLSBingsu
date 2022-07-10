import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

type response = {
  message: string;
};

type info = {
  createAt?: string;
  nickName?: string;
  email?: string;
  password?: string;
  userType?: string;
};

const useInfo = () => {
  const [infoError, setInfoError] = useState<Error['message']>('');
  const [info, setInfo] = useState({ status: '', data: '' });
  const [isLoading, setLoading] = useState(false);
  const [isInfoError, setIsInfoError] = useState(false);

  const getMyInfo = useCallback((_id: string) => {
    const URI = `${process.env}/user/info/${_id}`;

    setLoading(true);
    axios
      .get<response>(URI, {
        withCredentials: true,
      })
      .then((response) => {
        const data = String(response.data);
        setInfo({ status: 'OK', data });
        setInfoError('');
        setIsInfoError(false);
      })
      .catch((err: AxiosError | Error) => {
        console.log('catch', err);
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<response>;
          setIsInfoError(true);
          if (responseError && responseError.response) {
            setInfoError(responseError.response.data.message);
            setInfo({ status: 'infoError', data: '' });
          }
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      });
  }, []);

  return { getMyInfo, infoError, info, isLoading, isInfoError, setIsInfoError };
};

export default useInfo;
