import styled, { css } from 'styled-components';

const ImageStyle = styled.img<{ top: number; left: number; width: number }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: auto;
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
