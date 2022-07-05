import styled, { css } from 'styled-components';

const ImageStyle = styled.img<{
  top: number;
  left: number;
  width: number;
}>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: auto;
  cursor: pointer;
  z-index: 1;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:hover + figcaption {
    opacity: 1;
  }
  ${(props) =>
    props.top &&
    css`
      top: ${props.top}%;
    `};
  ${(props) =>
    props.left &&
    css`
      left: ${props.left}%;
    `};
`;

const FigcaptionStyle = styled.figcaption<{
  top: number;
  left: number;
}>`
  position: absolute;
  height: auto;
  z-index: 1;
  opacity: 0;
  width: 5rem;
  border-radius: 1rem;
  text-align: center;
  transition: all 0.2s ease-in-out;
  border: solid 1px ${(props) => props.theme.point3};
  background-color: #fff;
  ${(props) =>
    props.top &&
    css`
      top: ${props.top + 12}%;
    `};
  ${(props) =>
    props.left &&
    css`
      left: ${props.left + 5}%;
    `};
`;

export { ImageStyle, FigcaptionStyle };
