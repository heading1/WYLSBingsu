import { Wrapper, SubmitButton } from './WritePageStyle';
import ArticleForm from './components/ArticleForm';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';

const WritePage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();

  return (
    <Wrapper deviceHeight={deviceHeight}>
      <h1>OOO님의 빙수</h1>
      <ArticleForm>
        <SubmitButton>글 쓰기</SubmitButton>
      </ArticleForm>
    </Wrapper>
  );
};

export default WritePage;
