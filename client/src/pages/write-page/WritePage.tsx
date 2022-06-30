import { Wrapper, SubmitButton, StyledHeader } from './WritePageStyle';
import { ArticleForm, SelectTopping, StateButton } from './components';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import { useState, useLayoutEffect, useRef } from 'react';
import useWrite from './hook/useWrite';

const WritePage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();
  const [writeState, setWriteState] = useState(1);
  const articleRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { articlePost, setSelectedTopping, selectedTopping } = useWrite();

  useLayoutEffect(() => {
    const detectMobileKeyboard = () => {
      if (document.activeElement?.tagName === 'INPUT') {
        articleRef.current.scrollIntoView({ block: 'end' });
      }
    };

    window.addEventListener('resize', detectMobileKeyboard);

    return window.removeEventListener('resize', detectMobileKeyboard);
  }, []);

  return (
    <Wrapper deviceHeight={deviceHeight}>
      {writeState === 1 ? (
        <>
          <StyledHeader>토핑 정하기</StyledHeader>
          <SelectTopping
            setSelectedTopping={setSelectedTopping}
            selectedTopping={selectedTopping}
          />
          <StateButton setWriteState={setWriteState} />
        </>
      ) : (
        <>
          <StyledHeader>토핑 올리기</StyledHeader>
          <ArticleForm>
            <SubmitButton onClick={articlePost}>글 쓰기</SubmitButton>
          </ArticleForm>
          <StateButton ref={articleRef} setWriteState={setWriteState} />
        </>
      )}
    </Wrapper>
  );
};

export default WritePage;
