import React, { PropsWithChildren } from 'react';
import Wrapper from './FooterStyle';
import Button from '@mui/material/Button';

interface FooterProps {
  page: number;
  prevPage: Function;
  nextPage: Function;
}

const Footer: React.FC<FooterProps> = (
  props: PropsWithChildren<FooterProps>
) => {
  const { prevPage, nextPage, page } = props;

  return (
    <Wrapper>
      <Button variant="contained" onClick={() => prevPage()}>
        이전
      </Button>
      <div>{page + 1}</div>
      <Button variant="contained" onClick={() => nextPage()}>
        다음
      </Button>
    </Wrapper>
  );
};

export default Footer;
