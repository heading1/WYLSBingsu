import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import {
  ArticleInputType,
  ArticlePostType,
  ResponseObjectType,
} from '@/types/interfaces';
import { useNavigate } from 'react-router-dom';

interface ArticlePostResponse {
  message: string;
}

const useWrite = () => {
  const [selectedTopping, setSelectedTopping] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState<ResponseObjectType>({
    type: '',
    content: '',
  });
  const [showModal, setShowModal] = useState(false);
  const POST_URI = 'http://localhost:8070/article/register';
  const navigate = useNavigate();

  const articlePost = useCallback(
    (data: ArticleInputType) => {
      const postData: ArticlePostType = {
        ...data,
        uniqueNumber: '62b949f1071bbbeff46ab87e',
        toppingImage: selectedTopping,
      };

      setLoading(true);
      axios
        .post(POST_URI, postData)
        .then((response) => {
          console.log(response);
          setResult((previous) => ({
            ...previous,
            type: '글 쓰기 성공',
            content: '글 쓰기에 성공했습니다!',
          }));
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            const responseError = err as AxiosError<ArticlePostResponse>;
            if (responseError && responseError.response) {
              console.log(responseError.response);
              setResult((previous) => ({
                ...previous,
                type: '글 쓰기 실패',
                content: 'responseError.response?.data.message',
              }));
            }
          } else {
            navigate('/error');
          }
        })
        .finally(() => {
          setShowModal(true);
          setLoading(false);
        });
    },
    [selectedTopping]
  );

  return {
    articlePost,
    setSelectedTopping,
    selectedTopping,
    isLoading,
    result,
    showModal,
    setShowModal,
  };
};

export default useWrite;
