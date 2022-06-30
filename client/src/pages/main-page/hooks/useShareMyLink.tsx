import axios, { AxiosError } from 'axios';
import { FormInputType } from '@/types/interfaces';
import { useCallback, useState } from 'react';

type shareMyLinkResponse = {
  message: string;
};

const shareMyLink = () => {
  const [error, setError] = useState<Error['message']>('');
  const [result, setResult] = useState({ status: '', data: '' });
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const URI = `http://localhost:8070/user/link`;

  const getMyLink = useCallback(() => {
    setLoading(true);
    axios
      .get<shareMyLinkResponse>(URI, {
        withCredentials: true,
      })
      .then((response) => {
        const data = String(response.data);
        setResult({ status: 'OK', data });
        setError('');
        setShowError(false);
      })
      .catch((err: AxiosError | Error) => {
        console.log('catch', err);
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<shareMyLinkResponse>;
          setShowError(true);
          if (responseError && responseError.response) {
            setError(responseError.response.data.message);
            setResult({ status: 'error', data: '' });
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getMyLink, error, result, isLoading, showError, setShowError };
};

export default shareMyLink;
