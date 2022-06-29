import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import ArticleForm from './ArticleForm';
import { Wrapper, Background } from './DetailStyle';
interface DetailProps {
  nickname: string | '';
  article: string | '';
}

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.4rem 0;
  background-color: ${(props) => props.theme.point2};
  border-radius: 2rem;
  font-size: 1.4rem;
  color: #fff;
`;

const Detail: React.FC<DetailProps> = ({ nickname, article }) => {
  return (
    <Background>
      <Wrapper>
        <ArticleForm nickname={nickname} article={article}>
          <SubmitButton>종료</SubmitButton>
        </ArticleForm>
      </Wrapper>
    </Background>
  );
};

export default Detail;
