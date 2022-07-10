import styled from 'styled-components';

const Wrapper = styled.section`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 10%;
  & > button {
    width: 30%;
    height: 60%;
    background-color: rgba(0, 0, 0, 0.2);
    :hover {
      background-color: ${(props) => props.theme.point3};
    }
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration-style: bold;
    font-size: 1.5rem;
  }
`;

export default Wrapper;
