import { Wrapper, SubmitButton } from './WritePageStyle';
import { ArticleForm, SelectTopping, StateButton } from './components';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import { useState } from 'react';

const WritePage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();
  const [writeState, setWriteState] = useState(1);

  return (
    <Wrapper deviceHeight={deviceHeight}>
      {writeState === 1 ? (
        <>
          <h1>Select Topping</h1>
          <SelectTopping />
          <StateButton setWriteState={setWriteState} />
        </>
      ) : (
        <>
          <h1>OOO님의 빙수</h1>
          <ArticleForm>
            <SubmitButton>글 쓰기</SubmitButton>
            <StateButton setWriteState={setWriteState} />
          </ArticleForm>
        </>
      )}
    </Wrapper>
  );
};

export default WritePage;
