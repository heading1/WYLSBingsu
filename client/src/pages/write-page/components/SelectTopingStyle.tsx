import styled from 'styled-components';

interface ToppingProps {
  image: string;
}

export const Wrapper = styled.div`
  width: 80%;
  max-width: 26rem;
  height: 60%;
  margin: 2rem 0;
`;

export const ToppingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  height: 100%;
  width: 100%;
`;

export const Topping = styled.div<ToppingProps>`
  width: 100px;
  height: 100px;
  place-self: center center;
  background: url(${(props) => props.image}) no-repeat center/contain;
`;
