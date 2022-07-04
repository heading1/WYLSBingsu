import React, { PropsWithChildren } from 'react';
import { ImageStyle, FigcaptionStyle } from './ToppingStyle';
interface ToppingProps {
  top: number;
  left: number;
  width: number;
  imageSrc: string;
  nickName: string;
  rotate: number;
  eventClick: Function;
}

const Topping: React.FC<ToppingProps> = (
  props: PropsWithChildren<ToppingProps>
) => {
  console.log();
  const { eventClick, imageSrc, nickName, ...rest } = props;
  const handleClick = () => {
    eventClick();
  };
  // return <ImageStyle {...rest} onClick={handleClick} src={imageSrc} />;
  return (
    <figure>
      <ImageStyle {...rest} onClick={handleClick} src={imageSrc} />
      <FigcaptionStyle {...rest}>{nickName}</FigcaptionStyle>
    </figure>
  );
};

export default Topping;
