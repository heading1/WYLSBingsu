import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { ArticlePostType } from '@/types/interfaces';

const useWrite = () => {
  const [selectedTopping, setSelectedTopping] = useState<string>('');
  const POST_URI = 'http://localhost:8070/article/register';

  const articlePost = useCallback(() => {
    const data: ArticlePostType = {
      uniqueNumber: '62b949f1071bbbeff46ab87e',
      nickName: '',
      content: '',
      toppingImage: selectedTopping,
    };

    axios
      .post(POST_URI, data)
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }, []);

  return { articlePost, setSelectedTopping, selectedTopping };
};

export default useWrite;
