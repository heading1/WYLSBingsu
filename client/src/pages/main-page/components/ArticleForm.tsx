import { Wrapper, NicknameInput, ArticleInput } from './ArticleFormStyle';

interface ArticleProps {
  children: React.ReactNode;
  nickname: string | '';
  article: string | '';
}

const ArticleForm: React.FC<ArticleProps> = ({
  children,
  nickname,
  article,
}) => {
  return (
    <Wrapper>
      <label htmlFor="nickname">닉네임</label>
      <NicknameInput type="text" name="nickname" value={nickname} disabled />
      <label htmlFor="article">내용</label>
      <ArticleInput name="article" disabled value={article} />
      {children}
    </Wrapper>
  );
};

export default ArticleForm;
