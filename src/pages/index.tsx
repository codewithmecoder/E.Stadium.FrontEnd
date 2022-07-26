import { AxiosRequestHeaders } from 'axios';
import Head from 'next/head';
import LandingPage from '../components/LandingPage';
import { axiosInstance, getUser } from '../lib/util';
import { Paginate } from '../models/paginate.model';
import { StadiumInfo } from '../models/stadiums/stadium.model';
import { wrapper } from '../redux/store';
const Home = () => {
  return (
    <div className="flex pb-2 min-h-screen h-screen bg-base">
      <Head>
        <title>E Stadium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
      {/* {userData?.id ? (
        <div>
          <Header />
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
        </div>
      ) : (
        <LandingPage />
      )} */}
    </div>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const headers = context.req.headers;
    const data = await getUser(headers as AxiosRequestHeaders, store);
    let stadiumInfo: Paginate<StadiumInfo> | null = {} as Paginate<StadiumInfo>;
    try {
      const { data } = await axiosInstance.get<Paginate<StadiumInfo>>(
        'v1/stadium/all',
        {
          headers: headers as AxiosRequestHeaders,
          withCredentials: true,
        }
      );
      stadiumInfo = data;
    } catch (error) {
      stadiumInfo = null;
    }
    return data;
  }
);
