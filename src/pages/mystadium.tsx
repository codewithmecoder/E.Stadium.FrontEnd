import { AxiosRequestHeaders } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import CreateStadiumForm from '../components/CreateStadiumForm';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import Stadium from '../components/Stadium';
import { axiosInstance, getUser } from '../lib/util';
import { Paginate } from '../models/paginate.model';
import { StadiumInfo } from '../models/stadiums/stadium.model';
import { updateActiveByHref } from '../redux/slices/navbars/navbarSlice';
import {
  addStadiumToUserStadium,
  setUserStadium,
  stadiumUserState,
} from '../redux/slices/stadiums/stadiumByUserSlice';
import { stadiumIdState } from '../redux/slices/stadiums/stadiumSlice';
import { userState } from '../redux/slices/userSlices/userSlices';
import { wrapper } from '../redux/store';

interface Props {
  stadiumInfo: Paginate<StadiumInfo>;
}

const MyStaiumPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector(userState);
  const staduimId = useSelector(stadiumIdState);
  const [showModal, setShowModal] = useState(false);
  const stadiumInfo = useSelector(stadiumUserState);
  useEffect(() => {
    dispatch(updateActiveByHref('mystadium'));
  }, []);
  useEffect(() => {
    if (staduimId) {
      const fetchStadium = async () => {
        try {
          const { data } = await axiosInstance.get<StadiumInfo>(
            `v1/stadium/${staduimId}`
          );
          dispatch(addStadiumToUserStadium(data));
        } catch (error) {
          console.error(error);
        }
      };
      fetchStadium();
    }
  }, [staduimId]);
  return (
    <div className="min-h-screen min-w-full">
      <Header />
      {/* sticky top-[54px] */}
      <div className="bg-gray-800 py-4 px-[20px]">
        <SearchInput />
      </div>
      {stadiumInfo ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto px-4">
          {stadiumInfo?.items?.map((i, key) => (
            <Stadium key={key} data={i} />
          ))}
        </div>
      ) : (
        <h2>No Data</h2>
      )}
      <div className="sticky bottom-0 flex justify-end pr-2">
        <button
          type="button"
          className="py-1 px-1 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => setShowModal(true)}
        >
          <AiFillPlusCircle className="w-7 h-7 md:w-10 md:h-10 text-gray-500 dark:text-gray-100" />
        </button>
      </div>
      <CreateStadiumForm setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default MyStaiumPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      let stadiumInfo: Paginate<StadiumInfo> | null =
        {} as Paginate<StadiumInfo>;
      await getUser(req.headers as AxiosRequestHeaders, store);
      try {
        const { data } = await axiosInstance.get<Paginate<StadiumInfo>>(
          'v1/stadium/all-by-user',
          {
            headers: req.headers as AxiosRequestHeaders,
            withCredentials: true,
          }
        );
        stadiumInfo = data;
        store.dispatch(setUserStadium(data));
      } catch (error) {
        stadiumInfo = null;
      }
      return {
        props: { stadiumInfo },
      };
    }
);
