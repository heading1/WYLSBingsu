import { Wrapper, StyledHeader } from './WritePageStyle';
import { ArticleForm, SelectTopping, StateButton } from './components';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import { useState, useLayoutEffect, useRef } from 'react';
import useWrite from './hook/useWrite';
import { ArticleInputType } from '@/types/interfaces';
import Loading from '@/common/components/Loading';
import InfoModal from './components/InfoModal';

const WritePage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();
  const [writeState, setWriteState] = useState(1);
  const articleRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const {
    articlePost,
    setSelectedTopping,
    selectedTopping,
    isLoading,
    result,
    showModal,
    setShowModal,
  } = useWrite();

  useLayoutEffect(() => {
    const detectMobileKeyboard = () => {
      if (document.activeElement?.tagName === 'INPUT') {
        articleRef.current.scrollIntoView({ block: 'end' });
      }
    };

    window.addEventListener('resize', detectMobileKeyboard);

    return window.removeEventListener('resize', detectMobileKeyboard);
  }, []);

  const handleSubmit = (data: ArticleInputType) => {
    articlePost(data);
  };

  return (
    <>
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
            <ArticleForm onSubmit={handleSubmit} />
            <StateButton ref={articleRef} setWriteState={setWriteState} />
          </>
        )}
      </Wrapper>
      {isLoading && <Loading />}
      {showModal && <InfoModal />}
    </>
  );
};

export default WritePage;
