import { Wrapper, SubmitButton } from './WritePageStyle';
import ArticleForm from './components/ArticleForm';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';

const WritePage: React.FC = () => {
  const { deviceWidth, deviceHeight } = useDeviceViewport();

  return (
    <Wrapper deviceHeight={deviceHeight}>
      <ArticleForm deviceWidth={deviceWidth}>
        <SubmitButton>글 쓰기</SubmitButton>
      </ArticleForm>
    </Wrapper>
  );
};

export default WritePage;
