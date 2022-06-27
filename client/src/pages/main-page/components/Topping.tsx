import React, { PropsWithChildren } from 'react';
import ImageStyle from './ToppingStyle';
interface ToppingProps {
  top: number;
  left: number;
  width: number;
  imageSrc: string;
  rotate: number;
  eventClick: Function;
}

const Topping: React.FC<ToppingProps> = (
  props: PropsWithChildren<ToppingProps>
) => {
  const { eventClick, imageSrc, ...rest } = props;
  const handleClick = () => {
    eventClick();
  };
  return <ImageStyle {...rest} onClick={handleClick} src={imageSrc} />;
};

export default Topping;
