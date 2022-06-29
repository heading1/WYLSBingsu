import { theme } from '@/styles';
import React, { useEffect, useMemo, useState } from 'react';
import {
  bingsu,
  chocolate1,
  chocolate2,
  chocolate3,
  chocolate4,
  kiwi,
  pineapple,
  watermelon,
} from '@/assets/images';
import { Header, Footer, Detail, Topping } from './components';
import axios from 'axios';
import Wrapper from './MainPageStyle';
import MockData from './MockData.json';
import Loading from '@/common/components/Loading';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';

const ratio = theme.windowHeight / 1500;
const location1 = { top: 15, left: 32, width: 188 * ratio };
const location2 = { top: 22, left: 59, width: 188 * ratio };
const location3 = { top: 27, left: 12, width: 188 * ratio };
const location4 = { top: 35, left: 37, width: 188 * ratio };
const location5 = { top: 38, left: 70, width: 188 * ratio };
const location6 = { top: 40, left: 4, width: 188 * ratio };
const locationArr = [
  location1,
  location2,
  location3,
  location4,
  location5,
  location6,
];
const toppingImgArr = [kiwi, pineapple, watermelon];
const randomTopping = () => {
  const randomIndex = Math.floor(Math.random() * toppingImgArr.length);
  const randomImage = toppingImgArr[randomIndex];

  return randomImage;
};
const randomRotate = () => {
  return Math.floor(Math.random() * 360);
};
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
  const { deviceHeight } = useDeviceViewport();
  const [viewData, setViewData] = useState({ nickName: '', content: '' });
  const maxPage = useMemo(() => Math.ceil(data.length / 6) - 1, [data]);
  const [viewDetail, setViewDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  const nextPage = () => {
    if (page === maxPage) setPage(0);
    else setPage((page) => page + 1);
  };

  const prevPage = () => {
    if (page === 0) setPage(maxPage);
    else setPage((page) => page - 1);
  };

  const openDetail = (index: number) => {
    setViewData({ ...data[index] });
    setViewDetail(true);
  };

  const closeDetail = () => {
    setViewDetail(false);
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
    }, 500);
  }, [data]);
  return (
    <Wrapper $loading={loading} deviceHeight={deviceHeight}>
      <div>
        <img src={bingsu} />
        {loading ? (
          <Loading />
        ) : (
          <>
            <Header />
            {locationArr.map((item, i) => {
              return data[6 * page + i] ? (
                <Topping
                  {...item}
                  rotate={randomRotate()}
                  key={i + 1}
                  imageSrc={randomTopping()}
                  eventClick={() => openDetail(i)}
                />
              ) : (
                ''
              );
            })}

            <Footer nextPage={nextPage} prevPage={prevPage} />

            {viewDetail && <Detail {...viewData} closeDetail={closeDetail} />}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default MainPage;
