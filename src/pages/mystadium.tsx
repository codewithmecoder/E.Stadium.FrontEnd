import { AiFillPlusCircle } from 'react-icons/ai';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import Stadium from '../components/Stadium';

const MyStaiumPage = () => {
  return (
    <div className="min-h-screen relative min-w-full">
      <Header />
      <div className="bg-gray-800 py-4 px-[20px]">
        <SearchInput />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-auto px-4">
        <Stadium />
        <Stadium />
        <Stadium />
        <Stadium />
        <Stadium />
      </div>
      <div className="sticky bottom-2 flex justify-end pr-2">
        <button
          type="button"
          className="py-1 px-1 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <AiFillPlusCircle className="w-7 h-7 md:w-10 md:h-10 text-gray-500 dark:text-gray-100" />
        </button>
      </div>
    </div>
  );
};

export default MyStaiumPage;

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, res, resolvedUrl }) => {
//       await getUser(req.headers as AxiosRequestHeaders, store);
//       const paths = resolvedUrl.split('/');
//       const path = paths[paths.length - 1];
//       store.dispatch(updateActiveByHref(path));
//       return {
//         props: { nav: '' },
//       };
//     }
// );
