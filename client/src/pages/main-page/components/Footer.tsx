import React, { PropsWithChildren } from 'react';
import Wrapper from './FooterStyle';
import Button from '@mui/material/Button';

interface FooterProps {
  prevPage: Function;
  nextPage: Function;
}

const Footer: React.FC<FooterProps> = (
  props: PropsWithChildren<FooterProps>
) => {
  return (
    <Wrapper>
      <Button variant="contained">이전</Button>
      <Button variant="contained">다음</Button>
    </Wrapper>
  );
};

export default Footer;
