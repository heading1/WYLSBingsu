import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

type toppingDetailError = {
  message: string;
};

const useToppingDetail = () => {
  const [toppingDetailError, setToppingDetailError] =
    useState<Error['message']>('');
  const [toppingDetailResult, setToppingDetailResult] = useState({
    status: '',
    data: {},
  });
  const [toppingDetailIsLoading, setToppingDetailIsLoading] = useState(false);
  const [toppingDetailShowError, setToppingDetailShowError] = useState(false);

  const getToppingDetail = useCallback((_id: string) => {
    const URI = `http://localhost:8070/article/detail/tail/${_id}`;
    setToppingDetailIsLoading(true);
    axios
      .get<[]>(URI, {
        withCredentials: true,
      })
      .then((response) => {
        const data = response.data;
        setToppingDetailResult({ status: 'OK', data });
        setToppingDetailError('');
        setToppingDetailShowError(false);
      })
      .catch((err: AxiosError | Error) => {
        if (axios.isAxiosError(err)) {
          const responseError = err as AxiosError<toppingDetailError>;
          setToppingDetailShowError(true);
          if (responseError && responseError.response) {
            setToppingDetailError(responseError.response.data.message);
            setToppingDetailResult({ status: 'toppingDetailError', data: [] });
          }
        }
      })
      .finally(() => {
        setToppingDetailIsLoading(false);
      });
  }, []);

  return {
    getToppingDetail,
    toppingDetailError,
    toppingDetailResult,
    toppingDetailIsLoading,
    toppingDetailShowError,
    setToppingDetailShowError,
  };
};

export default useToppingDetail;
