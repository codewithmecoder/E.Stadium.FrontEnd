import type { NextPage } from 'next';
import Head from 'next/head';
import LandingPage from '../components/LandingPage';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen h-screen py-2 bg-[#b3b3b3d6]">
      <Head>
        <title>E Stadium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </div>
  );
};

export default Home;
