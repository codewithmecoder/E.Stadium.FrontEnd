import axios, { AxiosRequestHeaders } from 'axios';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { user, UserInfo } from '../models/user.model';
import LandingPage from '../components/LandingPage';
import {
  logOut,
  setUser,
  userState,
} from '../redux/slices/userSlices/userSlices';
import { wrapper } from '../redux/store';
const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(userState);
  const logout = async () => {
    axios.defaults.withCredentials = true;
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/v1/user/logout`,
      {
        withCredentials: true,
        crossDomain: true,
      }
    );
    dispatch(logOut());
  };
  return (
    <div className="flex min-h-screen h-screen py-2 bg-[#b3b3b3d6]">
      <Head>
        <title>E Stadium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {userData?.id ? (
        <div>
          <p>{userData.firstName}</p>
          <button className="btn btn-blue w-[200px]" onClick={logout}>
            Logout
          </button>
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
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/v1/user`,
        {
          headers: headers as AxiosRequestHeaders,
          withCredentials: true,
        }
      );
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
