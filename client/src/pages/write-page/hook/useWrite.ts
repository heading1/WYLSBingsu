import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { ArticleInputType, ArticlePostType } from '@/types/interfaces';

const useWrite = () => {
  const [selectedTopping, setSelectedTopping] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const POST_URI = 'http://localhost:8070/article/register';

  const articlePost = useCallback((data: ArticleInputType) => {
    const postData: ArticlePostType = {
      ...data,
      uniqueNumber: '62b949f1071bbbeff46ab87e',
      toppingImage: selectedTopping,
    };

    setLoading(true);
    axios
      .post(POST_URI, postData)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { articlePost, setSelectedTopping, selectedTopping, isLoading };
};

export default useWrite;
