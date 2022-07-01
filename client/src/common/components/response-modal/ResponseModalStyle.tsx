import styled from 'styled-components';

export const SuccessModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 90%;
    max-width: 26rem;
    height: 30%;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 3px 8px 10px 2px #2c2c2c;

    & span {
      font-size: 1.4rem;
    }

    & button {
      width: 14rem;
      height: 2.4rem;
      font-size: 1.2rem;
      text-align: center;
      color: #fff;
      opacity: 0.7;
      background-color: ${(props) => props.theme.point2};
      border-radius: 2.4rem;
      transition: opacity 0.2s linear;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
