import { ArticleInputType } from '@/types/interfaces';
import { useRef } from 'react';
import {
  Wrapper,
  NicknameInput,
  ArticleInput,
  SubmitButton,
} from './ArticleFormStyle';

interface ArticleProps {
  onSubmit: (data: ArticleInputType) => void;
}

const ArticleForm: React.FC<ArticleProps> = ({ onSubmit }) => {
  const nicknameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const articleRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  return (
    <Wrapper>
      <label htmlFor="nickname">닉네임</label>
      <NicknameInput
        type="text"
        name="nickname"
        placeholder="닉네임을 적어주세요."
        ref={nicknameRef}
      />
      <label htmlFor="article">내용</label>
      <ArticleInput
        name="article"
        placeholder="내용을 적어주세요."
        ref={articleRef}
      />
      <SubmitButton
        onClick={() => {
          onSubmit({
            nickName: nicknameRef.current.value,
            content: articleRef.current.value,
          });
        }}
      >
        글 쓰기
      </SubmitButton>
    </Wrapper>
  );
};

export default ArticleForm;
