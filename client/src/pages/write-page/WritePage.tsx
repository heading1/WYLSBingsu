import {
  Wrapper,
  SubmitButton,
  PageButton,
  ButtonWrapper,
} from './WritePageStyle';
import ArticleForm from './components/ArticleForm';
import SelectTopping from './components/SelectTopping';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import { useState } from 'react';

const WritePage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();
  const [writeState, setWriteState] = useState(1);

  return (
    <Wrapper deviceHeight={deviceHeight}>
      {writeState === 1 ? (
        <>
          <SelectTopping />
        </>
      ) : (
        <>
          <h1>OOO님의 빙수</h1>
          <ArticleForm>
            <SubmitButton>글 쓰기</SubmitButton>
          </ArticleForm>
        </>
      )}
      <ButtonWrapper>
        <PageButton
          onClick={() => {
            setWriteState(1);
          }}
        >
          이전
        </PageButton>
        <PageButton
          onClick={() => {
            setWriteState(2);
          }}
        >
          다음
        </PageButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default WritePage;
