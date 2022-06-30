import { Wrapper, ToppingContainer, Topping } from './SelectTopingStyle';
import {
  chocolate1,
  chocolate2,
  chocolate3,
  chocolate4,
  kiwi,
  pineapple,
  watermelon,
} from '@/assets/images';

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
  return (
    <Wrapper>
      <ToppingContainer>
        {toppingList.map((topping, index) => (
          <Topping key={index} image={topping} />
        ))}
      </ToppingContainer>
    </Wrapper>
  );
};

export default SelectTopping;
