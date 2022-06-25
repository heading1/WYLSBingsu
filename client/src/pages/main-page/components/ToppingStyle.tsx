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
  &:hover {
    transition: all 0.3s ease-in-out;
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
