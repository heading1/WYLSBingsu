import {
  Wrapper,
  ToppingContainer,
  ToppingImg,
  ToppingDiv,
} from './SelectTopingStyle';
import {
  chocolate1,
  chocolate2,
  chocolate3,
  chocolate4,
  kiwi,
  pineapple,
  watermelon,
} from '@/assets/images';
import { useState } from 'react';

const toppingList = [
  chocolate1,
  chocolate2,
  chocolate3,
  chocolate4,
  kiwi,
  pineapple,
  watermelon,
];

interface SelectToppingProps {
  setSelectedTopping: React.Dispatch<React.SetStateAction<string>>;
  selectedTopping: string;
}

const SelectTopping: React.FC<SelectToppingProps> = ({
  setSelectedTopping,
  selectedTopping,
}) => {
  return (
    <Wrapper>
      <ToppingContainer>
        {toppingList.map((topping) => (
          <ToppingDiv className={selectedTopping === topping ? 'selected' : ''}>
            <ToppingImg
              key={topping}
              src={topping}
              onClick={() => {
                setSelectedTopping(topping);
              }}
            />
          </ToppingDiv>
        ))}
      </ToppingContainer>
    </Wrapper>
  );
};

export default SelectTopping;
