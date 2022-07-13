import styled from 'styled-components';

interface ToppingProps {
  image?: string;
}

export const Wrapper = styled.div`
  width: 80%;
  max-width: 26rem;
  height: 60%;
  margin-bottom: 2rem;
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
  width: 70%;
  height: auto;
`;

export const ToppingDiv = styled.div`
  place-self: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: auto;
  min-height: 85px;
  border: 3px solid #fff;

  :hover {
    border: 3px solid ${(props) => props.theme.orange};
  }

  &.selected {
    border: 3px solid ${(props) => props.theme.orange};
  }
`;
