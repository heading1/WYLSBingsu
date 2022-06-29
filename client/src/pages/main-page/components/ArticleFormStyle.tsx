import styled from 'styled-components';
import { DeviceViewport } from '@/types/interfaces';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  padding: 0 1.5rem;
  /* background-color: rgba(255, 255, 255, 0.7); */
  flex-direction: column;
  justify-content: center;

  & label {
    font-size: 1.3rem;
  }

  & input,
  & textarea {
    width: 100%;
    font-size: 1.2rem;
    margin: 1rem 0;
  }
`;

export const NicknameInput = styled.input`
  padding: 0.4rem;
  background-color: rgba(255, 255, 255, 0.5);
  /* border-bottom: 3px solid ${(props) => props.theme.point2}; */
`;

export const ArticleInput = styled.textarea`
  padding: 0.4rem;
  resize: none;
  height: 30vh;
  background-color: rgba(255, 255, 255, 0.5);
  line-height: 1.8rem;
  /* border: 3px solid ${(props) => props.theme.point2}; */
`;
