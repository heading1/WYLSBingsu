import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

type toppingError = {
  message: string;
};

const useToppingList = () => {
  const [toppingError, setToppingError] = useState<Error['message']>('');
  const [toppingResult, setToppingResult] = useState({ status: '', data: [] });
  const [toppingIsLoading, setToppingIsLoading] = useState(false);
  const [toppingShowError, setToppingShowError] = useState(false);

  const getToppings = useCallback((page?: number, userId?: string) => {
    // const URI = `http://localhost:8070/article/${page}/${userId}`;
    const URI = `http://localhost:8070/article/${page}/test`;
    setToppingIsLoading(true);
    axios
      .get<[]>(URI, {
        withCredentials: true,
      })
      .then((response) => {
        const data = response.data;
        setToppingResult({ status: 'OK', data });
        setToppingError('');
        setToppingShowError(false);
      })
      .catch((err: AxiosError | Error) => {
        console.log('catch', err);
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<toppingError>;
          setToppingShowError(true);
          if (responseError && responseError.response) {
            setToppingError(responseError.response.data.message);
            setToppingResult({ status: 'toppingError', data: [] });
          }
        }
      })
      .finally(() => {
        setTimeout(() => {
          setToppingIsLoading(false);
        }, 250);
      });
  }, []);

  return {
    getToppings,
    toppingError,
    toppingResult,
    toppingIsLoading,
    toppingShowError,
    setToppingShowError,
  };
};

export default useToppingList;
