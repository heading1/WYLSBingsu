import { Wrapper, NicknameInput, ArticleInput } from './ArticleFormStyle';

interface ArticleProps {
  deviceWidth: string | undefined;
  children: React.ReactNode;
}

const ArticleForm: React.FC<ArticleProps> = ({ deviceWidth, children }) => {
  return (
    <Wrapper deviceWidth={deviceWidth}>
      <label htmlFor="nickname">닉네임</label>
      <NicknameInput
        type="text"
        name="nickname"
        placeholder="닉네임을 적어주세요."
      />
      <label htmlFor="article">내용</label>
      <ArticleInput name="article" placeholder="내용을 적어주세요." />
      {children}
    </Wrapper>
  );
};

export default ArticleForm;
