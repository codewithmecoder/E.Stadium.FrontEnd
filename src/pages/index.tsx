import { AxiosRequestHeaders } from 'axios';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import { getUser } from '../lib/util';
import { userState } from '../redux/slices/userSlices/userSlices';
import { wrapper } from '../redux/store';
const Home = () => {
  const userData = useSelector(userState);

  return (
    <div className="flex pb-2 min-h-screen h-screen bg-base">
      <Head>
        <title>E Stadium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {userData?.id ? (
        <div>
          <Header />
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const headers = context.req.headers;
    return await getUser(headers as AxiosRequestHeaders, store);
  }
);
