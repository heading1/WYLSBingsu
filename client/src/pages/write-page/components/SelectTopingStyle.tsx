import styled from 'styled-components';

interface ToppingProps {
  image?: string;
}

export const Wrapper = styled.div`
  width: 80%;
  max-width: 26rem;
  height: 60%;
  margin: 2rem 0;
  border-radius: 30px;
  background-color: #fff;
`;

export const ToppingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  height: 100%;
  width: 100%;
  padding: 0.5rem 0.5rem;
`;

export const ToppingImg = styled.img<ToppingProps>`
  width: 100px;
  height: 100px;
`;

export const ToppingDiv = styled.div`
  place-self: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 110px;

  :hover {
    border: 3px solid ${(props) => props.theme.orange};
  }

  &.select {
    border: 3px solid ${(props) => props.theme.orange};
  }
`;
