import { ButtonWrapper, PageButton } from './StateButtonStyle';

interface StateButtonProps {
  setWriteState: React.Dispatch<React.SetStateAction<number>>;
  ref?: React.MutableRefObject<HTMLDivElement>;
}

const StateButton: React.FC<StateButtonProps> = ({ setWriteState, ref }) => {
  return (
    <ButtonWrapper ref={ref}>
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
        next={true}
      >
        다음
      </PageButton>
    </ButtonWrapper>
  );
};

export default StateButton;
