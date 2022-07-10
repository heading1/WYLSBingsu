import { ButtonWrapper, PageButton } from './StateButtonStyle';
import { useRef, useLayoutEffect } from 'react';

interface StateButtonProps {
  setWriteState: React.Dispatch<React.SetStateAction<number>>;
}

const StateButton: React.FC<StateButtonProps> = ({ setWriteState }) => {
  const divRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useLayoutEffect(() => {
    const detectMobileKeyboard = () => {
      if (document.activeElement?.tagName === 'INPUT') {
        divRef.current.scrollIntoView({ block: 'end' });
      }
    };

    window.addEventListener('resize', detectMobileKeyboard);

    return window.removeEventListener('resize', detectMobileKeyboard);
  }, []);

  return (
    <ButtonWrapper ref={divRef}>
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
