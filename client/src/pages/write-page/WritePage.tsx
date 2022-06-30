import { Wrapper, SubmitButton, StyledHeader } from './WritePageStyle';
import { ArticleForm, SelectTopping, StateButton } from './components';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import { useState } from 'react';

const WritePage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();
  const [writeState, setWriteState] = useState(2);

  return (
    <Wrapper deviceHeight={deviceHeight}>
      {writeState === 1 ? (
        <>
          <StyledHeader>토핑 정하기</StyledHeader>
          <SelectTopping />
          <StateButton setWriteState={setWriteState} />
        </>
      ) : (
        <>
          <StyledHeader>토핑 올리기</StyledHeader>
          <ArticleForm>
            <SubmitButton>글 쓰기</SubmitButton>
          </ArticleForm>
          <StateButton setWriteState={setWriteState} />
        </>
      )}
    </Wrapper>
  );
};

export default WritePage;
