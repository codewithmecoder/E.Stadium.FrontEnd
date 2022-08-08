import { AxiosRequestHeaders } from 'axios';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import { axiosInstance } from '../lib/util';
import { user, UserInfo } from '../models/user.model';
import { setUser, userState } from '../redux/slices/userSlices/userSlices';
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
    let userInfo = user;
    try {
      const { data } = await axiosInstance.get<UserInfo>('v1/user', {
        headers: headers as AxiosRequestHeaders,
        withCredentials: true,
      });
      userInfo = data;
      store.dispatch(setUser(data));
    } catch (error) {
      userInfo = null;
    }
    return {
      props: { userData: userInfo as UserInfo },
    };
  }
);
