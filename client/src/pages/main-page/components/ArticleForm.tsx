import { Wrapper, NicknameInput, ArticleInput } from './ArticleFormStyle';

interface ArticleProps {
  children: React.ReactNode;
  nickName: string | '';
  content: string | '';
}

const ArticleForm: React.FC<ArticleProps> = ({
  children,
  nickName,
  content,
}) => {
  return (
    <Wrapper>
      <label htmlFor="nickName">닉네임</label>
      <NicknameInput type="text" name="nickName" value={nickName} disabled />
      <label htmlFor="content">내용</label>
      <ArticleInput name="content" disabled value={content} />
      {children}
    </Wrapper>
  );
};

export default ArticleForm;
