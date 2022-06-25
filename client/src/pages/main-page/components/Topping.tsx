import React from 'react';
import ImageStyle from './ToppingStyle';
interface ToppingProps {
  top: number;
  left: number;
  width: number;
  imageSrc: string;
  onClick: Function;
}

const Topping: React.FC<ToppingProps> = ({
  top,
  left,
  width,
  imageSrc,
  onClick,
}) => {
  return <ImageStyle top={top} left={left} width={width} src={imageSrc} />;
};

export default Topping;
