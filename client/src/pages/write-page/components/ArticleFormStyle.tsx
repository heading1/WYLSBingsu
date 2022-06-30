import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 95%;
  max-width: 26rem;
  padding: 3.5rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  flex-direction: column;
  justify-content: center;

  & label {
    font-size: 1.4rem;
  }

  & input,
  & textarea {
    width: 100%;
    font-size: 1.2rem;
    margin: 2rem 0;
  }
`;

export const NicknameInput = styled.input`
  padding: 0.4rem;
  border-bottom: 3px solid ${(props) => props.theme.point2};
`;

export const ArticleInput = styled.textarea`
  padding: 1rem;
  resize: none;
  height: 20rem;
  background-color: #fff;
  line-height: 1.8rem;
  border: 3px solid ${(props) => props.theme.point2};
`;
