import { theme } from '@/styles';
import React, { useEffect, useMemo, useState } from 'react';
import backgroundImg from '../../assets/images/bingsu.jpeg';
import { Header, Footer } from './components';
import axios from 'axios';
import Wrapper from './MainPageStyle';
import riceCakeImg from '@/assets/images/riceCake.png';
import Topping from './components/Topping';
import MockData from './MockData.json';
import Loading from '@/components/Loading';

const ratio = theme.windowHeight / 1000;
const location1 = { top: 15, left: 28, width: 188 * ratio };
const location2 = { top: 22, left: 55, width: 188 * ratio };
const location3 = { top: 27, left: 8, width: 188 * ratio };
const location4 = { top: 35, left: 33, width: 188 * ratio };
const location5 = { top: 38, left: 66, width: 188 * ratio };
const location6 = { top: 40, left: 0, width: 188 * ratio };

interface TestInterface {
  uniqueNumber: string;
  nickName: string;
  content: string;
  toppingImage: string;
}
interface DataInterface extends Array<TestInterface> {}

const MainPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<DataInterface>(MockData);
  const maxPage = useMemo(() => Math.ceil(data.length / 6), [data]);
  const [loading, setLoading] = useState(false);

  const nextPage = () => {
    if (page === maxPage) setPage(0);
    else setPage((page) => page + 1);
  };

  const prevPage = () => {
    if (page === 0) setPage(maxPage);
    else setPage((page) => page - 1);
  };

  const handleClick = () => {
    return alert('test');
  };

  useEffect(() => {
    setLoading(true);

    console.log(data);
    //query를 리턴하는 함수를 result에 할당
    // async function get() {
    // const result = await axios.get(`/MockData.json`);
    //   setData(MockData);
    //   setLoading(false);
    // }
    // get();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [data]);

  return (
    <Wrapper>
      <div>
        <img src={backgroundImg} />

        <Header />
        {loading ? (
          <Loading />
        ) : (
          <>
            <Topping
              {...location1}
              imageSrc={riceCakeImg}
              eventClick={handleClick}
            />
            <Topping
              {...location2}
              imageSrc={riceCakeImg}
              eventClick={() => alert('test2')}
            />
            <Topping
              {...location3}
              imageSrc={riceCakeImg}
              eventClick={() => alert('test3')}
            />
            <Topping
              {...location4}
              imageSrc={riceCakeImg}
              eventClick={() => alert('test4')}
            />
            <Topping
              {...location5}
              imageSrc={riceCakeImg}
              eventClick={() => alert('test5')}
            />
            <Topping
              {...location6}
              imageSrc={riceCakeImg}
              eventClick={() => alert('test6')}
            />
          </>
        )}
        <Footer nextPage={nextPage} prevPage={prevPage} />
      </div>
    </Wrapper>
  );
};

export default MainPage;
