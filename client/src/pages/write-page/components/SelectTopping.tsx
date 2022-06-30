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
          <ToppingDiv>
            <ToppingImg key={index} src={topping} />
          </ToppingDiv>
        ))}
      </ToppingContainer>
    </Wrapper>
  );
};

export default SelectTopping;
