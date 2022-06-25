import React from 'react';
import ImageStyle from './ToppingStyle';
import riceCakeImg from '../../../assets/images/riceCake.png';
interface ToppingProps {
  top: number;
  left: number;
  width: number;
  imageSrc: string;
}

const Topping: React.FC<ToppingProps> = ({ top, left, width, imageSrc }) => {
  return <ImageStyle top={top} left={left} width={width} src={imageSrc} />;
};

export default Topping;
