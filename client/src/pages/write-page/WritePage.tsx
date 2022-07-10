import { Wrapper, StyledHeader } from './WritePageStyle';
import { ArticleForm, SelectTopping, StateButton } from './components';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import { useState } from 'react';
import useWrite from './hook/useWrite';
import { ArticleInputType } from '@/types/interfaces';
import Loading from '@/common/components/Loading';
import ResponseModal from '@/common/components/response-modal/ResponseModal';
import { useParams } from 'react-router-dom';

type IdParams = {
  userId: string;
};

const WritePage: React.FC = () => {
  const { deviceHeight } = useDeviceViewport();
  const [writeState, setWriteState] = useState(1);

  const {
    articlePost,
    setSelectedTopping,
    selectedTopping,
    isLoading,
    result,
    showModal,
    setShowModal,
  } = useWrite();
  const params = useParams<IdParams>();

  const handleSubmit = (data: ArticleInputType) => {
    if (!data.nickName || !data.content) alert('닉네임과 내용을 입력해주세요!');
    else articlePost(data, params.userId);
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
            <StateButton setWriteState={setWriteState} />
          </>
        )}
      </Wrapper>
      {isLoading && <Loading />}
      {showModal && (
        <ResponseModal
          to={result.type === 'SUCCESS' ? `/${params.userId}` : undefined}
          content={result.content}
          buttonText="확인"
          onClick={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default WritePage;
