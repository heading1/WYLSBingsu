import styled from 'styled-components';
import noBingsuSrc from '@/assets/images/no_bingsu.jpeg';
import { DeviceViewport } from '@/types/interfaces';
import { Link } from 'react-router-dom';

const Wrapper = styled.div<DeviceViewport>`
  display: flex;
  height: ${(props) => props.deviceHeight};
  background: url(${noBingsuSrc}) no-repeat center/auto 100%;
  background-color: ${(props) => props.theme.point4};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InfoDiv = styled.div`
  display: flex;
  width: 25.2rem;
  height: 24rem;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & h1 {
    font-size: 2.4rem;
    color: #000;
    text-align: center;

    & strong {
      color: red;
    }
  }

  & p {
    margin: 0.4rem 0;
    font-size: 1.2rem;
  }
`;

const HomeLink = styled(Link)`
  width: 10rem;
  padding: 0.6rem 0;
  margin-top: 2rem;
  background-color: ${(props) => props.theme.point2};
  border-radius: 2.2rem;
  font-size: 1.6rem;
  color: #fff;
  text-align: center;
  opacity: 0.8;
  transition: opacity 0.2s linear;

  &:hover {
    opacity: 1;
  }
`;

export { Wrapper, InfoDiv, HomeLink };
