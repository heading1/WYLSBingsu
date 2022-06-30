import styled from 'styled-components';

interface ButtonProps {
  next?: boolean;
}

export const PageButton = styled.button<ButtonProps>`
  width: 45%;
  height: 2.4rem;
  font-size: 1.4rem;
  border-radius: 1.6rem;
  color: #fff;
  background-color: ${(props) => (props.next ? props.theme.point3 : 'gray')};

  + button {
    margin-left: 20px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 26rem;
`;
