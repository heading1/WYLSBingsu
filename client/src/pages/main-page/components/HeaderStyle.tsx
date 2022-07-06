import styled from 'styled-components';

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  text-align: left;
  margin-top: 3%;
  & > article {
    position: absolute;
    margin-left: 5%;
    width: 50%;
    font-size: 1rem;
    top: 0.5vh;
    word-break: keep-all;
  }
  & > nav {
    position: absolute;
    top: 0.5vh;
    width: 45%;
    left: 55%;
    min-width: 200px;
    display: flex;
    justify-content: flex-end;
    padding: 1%;
  }
`;
const Tooltip = styled.div`
  position: absolute;
  top: 0;
  /* left: 40%; */
  z-index: 1;
  background-color: #fff;
  color: ${(props) => props.theme.point1};
  padding: 10px 10px;
  font-size: 10px;
  font-weight: 500;
  border-radius: 25px;
  opacity: 0;
  pointer-events: none;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

const NavButton = styled.div`
  display: flex;
  justify-content: center;
  img {
    cursor: pointer;
    width: 80%;
    margin: 0%;
    z-index: 2;
  }
  :hover {
    img {
      transform: scale(1.1);
      transition: all 0.2s linear;
    }
    div {
      top: 70px;
      opacity: 1;
      pointer-events: auto;
      background-color: ${(props) => props.theme.point4};
    }
  }
`;
export { Wrapper, Tooltip, NavButton };
