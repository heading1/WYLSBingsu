import styled from 'styled-components';
import { bingsu } from '@/assets/images';
import { DeviceViewport } from '@/types/interfaces';

export const Wrapper = styled.div<DeviceViewport>`
  display: flex;
  position: relative;
  width: 100vw;
  height: ${(props) => props.deviceHeight};
  background: url(${bingsu}) no-repeat center/auto 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 10;
  }

  strong {
    color: ${(props) => props.theme.point3};
    border-bottom: 3px dotted ${(props) => props.theme.point3};
  }
`;

export const IntroHeader = styled.h1`
  max-width: 35rem;
  height: 4rem;
  font-size: 2.2rem;
  color: #fff;
  text-align: center;
  line-height: 150%;
`;

export const IntroImg = styled.img`
  width: 180px;
  height: 180px;
  margin: 2rem 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin: 1rem 0;
    font-size: 1.2rem;
    color: #fff;
  }
`;

interface LinkButtonProps {
  to?: string;
}

export const LinkButton = styled.button<LinkButtonProps>`
  width: 18rem;
  height: 3rem;
  border: 2px solid #fff;
  font-size: 1.4rem;
  color: #fff;
  cursor: pointer;

  :hover {
    background-color: ${(props) =>
      props.to === 'register' ? props.theme.orange : props.theme.point3};
  }
`;
