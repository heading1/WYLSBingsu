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

export default ImageStyle;
