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
import Loading from '@/common/components/Loading';
import useDeviceViewport from '@/common/hooks/useDeviceViewport';
import Modal from '@/common/components/Modal';
import shareMyLink from './hooks/useShareMyLink';
import { useParams } from 'react-router-dom';
import useToppingList from './hooks/useToppingList';
import useToppingDetail from './hooks/useToppingDetail';
import useDidMountEffect from './hooks/useDidMountEffect';
import { useNavigate } from 'react-router-dom';
import useInfo from './hooks/useInfo';
import useLogout from '@/common/hooks/useLogout';

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

const randomRotate = () => {
  return Math.floor(Math.random() * 360);
};

type data = { _id: string; nickName: string; toppingImage: string };
const MainPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<data[]>([]);
  const { deviceHeight } = useDeviceViewport();
  const [viewDetail, setViewDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    content: '',
    flag: false,
    afterClose: () => {},
  });
  const { getMyLink, showError, error, setShowError, result } = shareMyLink();
  const { getMyInfo, info } = useInfo();
  const [btnType, setBtnType] = useState('');
  const params = useParams();
  const userId = params.userId;
  let navigate = useNavigate();

  const { getLogout, logoutStatus } = useLogout();
  const { getToppings, toppingResult, toppingIsLoading } = useToppingList();

  const {
    getToppingDetail,
    toppingDetailError,
    toppingDetailResult,
    toppingDetailIsLoading,
    toppingDetailShowError,
  } = useToppingDetail();

  const nextPage = () => {
    setPage((cur) => cur + 1);
  };

  const prevPage = () => {
    if (page === 0) alert('첫 번째 빙수입니다.');
    else setPage((page) => page - 1);
  };

  useEffect(() => {
    if (userId !== undefined) getToppings(page + 1, userId);
  }, [page]);

  const openDetail = (_id: string) => {
    getToppingDetail(_id);
    setViewDetail(true);
  };

  const closeDetail = () => {
    setViewDetail(false);
  };

  useEffect(() => {
    if (userId !== undefined) {
      getToppings(page + 1, userId);
      getMyInfo(userId);
    }
  }, [userId]);

  useDidMountEffect(() => {
    const { data } = toppingResult;

    if (data.length === 0 && page === 0) {
      setData([]);
    }
    if (data.length >= 1) {
      setData(data);
    } else {
      if (page !== 0) {
        alert('마지막 빙수입니다.');
        setPage((page) => page - 1);
      }
    }
  }, [toppingResult]);

  useEffect(() => {
    switch (btnType) {
      case 'home':
        if (result.status === 'OK') {
          navigate(`/${result.data}`);
        } else {
          setModal({
            content: `내 빙수를 찾을 수 없습니다.\n로그인 화면으로 이동합니다!`,
            flag: true,
            afterClose: () => navigate('/login'),
          });
        }
        break;
      case 'logout':
        if (result.status === 'OK') {
          setModal({
            content: `성공적으로 로그아웃되었습니다.\n로그인 화면으로 이동합니다!`,
            flag: true,
            afterClose: () => navigate('/login'),
          });
        }
        break;
      default:
        break;
    }
  }, [result, logoutStatus]);

  useEffect(() => {
    getMyLink();
  }, []);

  return (
    <Wrapper $loading={loading} deviceHeight={deviceHeight}>
      <div>
        <img src={bingsu} />
        {toppingIsLoading || toppingDetailIsLoading ? (
          <Loading />
        ) : (
          <>
            <Header
              getMyLink={getMyLink}
              setBtnType={setBtnType}
              info={info.data}
              getLogout={getLogout}
              isLogin={!showError}
            />
            {locationArr.map((item, i) => {
              return data[i] ? (
                <Topping
                  {...item}
                  rotate={randomRotate()}
                  key={i + 1}
                  nickName={data[i].nickName}
                  imageSrc={data[i].toppingImage}
                  eventClick={() => openDetail(data[i]._id)}
                />
              ) : (
                ''
              );
            })}

            <Footer nextPage={nextPage} prevPage={prevPage} page={page} />

            <Detail
              {...toppingDetailResult.data}
              closeDetail={closeDetail}
              toppingDetailShowError={toppingDetailShowError}
              toppingDetailError={toppingDetailError}
              view={viewDetail}
            />

            <Modal
              content={modal.content}
              setOpen={setModal}
              open={modal.flag}
              afterClose={modal.afterClose}
            />
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(MainPage);
