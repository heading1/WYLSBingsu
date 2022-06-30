import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { ArticleInputType, ArticlePostType } from '@/types/interfaces';
import { useNavigate } from 'react-router-dom';

interface ArticlePostResponse {
  message: string;
}

const useWrite = () => {
  const [selectedTopping, setSelectedTopping] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState({ type: '', content: '' });
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
      console.log('postData', postData);

      setLoading(true);
      axios
        .post(POST_URI, postData)
        .then((response) => {
          // 다시 그사람 빙수로 리턴
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            const responseError = err as AxiosError<ArticlePostResponse>;
            if (responseError && responseError.response) {
              console.log(responseError.response);
            }
          } else {
            navigate('/error');
          }
        })
        .finally(() => {
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
