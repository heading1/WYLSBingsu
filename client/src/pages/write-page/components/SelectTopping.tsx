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

const SelectTopping: React.FC = () => {
  const [select, setSelect] = useState<number>();

  return (
    <Wrapper>
      <ToppingContainer>
        {toppingList.map((topping, index) => (
          <ToppingDiv className={select === index ? 'select' : ''}>
            <ToppingImg
              key={index}
              src={topping}
              onClick={() => {
                setSelect(index);
              }}
            />
          </ToppingDiv>
        ))}
      </ToppingContainer>
    </Wrapper>
  );
};

export default SelectTopping;
