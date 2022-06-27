import { Wrapper, SubmitButton } from './WritePageStyle';
import ArticleForm from './components/ArticleForm';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';

const WritePage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();

  return (
    <Wrapper deviceHeight={deviceHeight}>
      <ArticleForm />
      <SubmitButton>글 쓰기</SubmitButton>
    </Wrapper>
  );
};

export default WritePage;
