import { ButtonWrapper, PageButton } from './StateButtonStyle';

interface StateButtonProps {
  setWriteState: React.Dispatch<React.SetStateAction<number>>;
}

const StateButton: React.FC<StateButtonProps> = ({ setWriteState }) => {
  return (
    <ButtonWrapper>
      <PageButton
        onClick={() => {
          setWriteState(1);
        }}
      >
        이전
      </PageButton>
      <PageButton
        onClick={() => {
          setWriteState(2);
        }}
      >
        다음
      </PageButton>
    </ButtonWrapper>
  );
};

export default StateButton;
