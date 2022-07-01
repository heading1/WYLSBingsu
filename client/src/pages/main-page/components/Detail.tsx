import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import ArticleForm from './ArticleForm';
import { Wrapper, Background } from './DetailStyle';
interface DetailProps {
  nickName?: string | '';
  content?: string | '';
  message?: string | '';
  closeDetail: Function;
  toppingDetailShowError?: boolean;
  toppingDetailError?: string;
}

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.4rem 0;
  background-color: ${(props) => props.theme.point2};
  border-radius: 2rem;
  font-size: 1.4rem;
  color: #fff;
`;

const Detail: React.FC<DetailProps> = ({
  nickName,
  content,
  message,
  closeDetail,
  toppingDetailShowError,
  toppingDetailError,
}) => {
  return (
    <Background>
      <Wrapper>
        <ArticleForm
          nickName={nickName}
          content={content}
          message={message}
          toppingDetailShowError={toppingDetailShowError}
          toppingDetailError={toppingDetailError}
        >
          <SubmitButton onClick={() => closeDetail()}>닫기</SubmitButton>
        </ArticleForm>
      </Wrapper>
    </Background>
  );
};

export default Detail;
