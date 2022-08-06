import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, userState } from '../redux/slices/userSlices/userSlices';
function Header() {
  const userInfo = useSelector(userState);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openProfileMenu, setOpenProfileMenu] = useState<Boolean>(false);
  const [showHideMenu, setShowHideMenu] = useState<Boolean>(false);
  const [iconX, setIconX] = useState<Boolean>(false);
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
  const handleOpenProfileMenu = () => setOpenProfileMenu((prev) => !prev);
  const handleShowHideMenu = () => setShowHideMenu((prev) => !prev);
  const handleIconX = () => setIconX((prev) => !prev);
  return (
    <div className="w-screen h-[6%] bg-gray-800">
      <div className="flex px-3 gap-5 items-center">
        <div className="relitive mt-2">
          <Image
            src="/images/profile.png"
            alt="E Staduim"
            width={40}
            height={40}
          />
        </div>
        <div className="flex-1">
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <a
                href="#"
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                aria-current="page"
              >
                Dashboard
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Team
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Projects
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Calendar
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Reports
              </a>
            </div>
          </div>
        </div>
        <div className="md:flex items-center gap-2 hidden">
          <button
            type="button"
            className="bg-gray-800 p-1 rounded-full text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <AiOutlineBell className="text-[23px] hover:text-white text-gray-400" />
          </button>
          <div className="relitive mt-1">
            <button
              onClick={handleOpenProfileMenu}
              type="button"
              className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <Image
                src="/images/profile.png"
                alt="E Staduim"
                width={30}
                height={30}
              />
            </button>
          </div>
          <div
            className={`${
              openProfileMenu ? 'hidden' : 'absolute'
            } origin-top-right absolute ease-in right-4 w-48 top-12 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              id="user-menu-item-0"
            >
              Your Profile
            </a>

            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              id="user-menu-item-1"
            >
              Settings
            </a>

            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              id="user-menu-item-2"
            >
              Sign out
            </a>
          </div>
        </div>
        <div className="md:hidden">
          <button
            onClick={handleShowHideMenu}
            type="button"
            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              onClick={handleIconX}
              className={`${iconX ? 'hidden' : 'block'} h-5 w-5`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              onClick={handleIconX}
              className={`${iconX ? 'block' : 'hidden'} h-5 w-5`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${
          showHideMenu ? 'block' : 'hidden'
        } md:hidden bg-gray-800 -m-1.5 w-full mx-auto`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <a
            href="#"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </a>

          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </a>

          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </a>

          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Reports
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                Tom Cook
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                tom@example.com
              </div>
            </div>
            <button
              type="button"
              className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">View notifications</span>
              {/* <!-- Heroicon name: outline/bell --> */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Your Profile
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Settings
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>

    // <div className="w-screen h-10 bg-white flex px-3 gap-5">
    //   <button className="btn btn-light-gray w-[80px]" onClick={logout}>
    //     Logout
    //   </button>
    //   <form className="flex-1 h-[100%]">
    //     <div className="input-box flex items-center gap-5">
    //       <label htmlFor="default-search">
    //         <BsSearch />
    //       </label>
    //       <input
    //         type="search"
    //         id="default-search"
    //         className="focus:outline-none focus:shadow-outline w-full"
    //         placeholder="search name, location etc..."
    //         autoComplete="off"
    //       />
    //     </div>
    //   </form>
    //   <div className="btn btn-light-gray w-auto">
    //     <p>My Stadium</p>
    //   </div>
    //   <div
    //     className="cursor-pointer"
    //     onClick={() => router.push(`/profile/${userInfo?.id}`)}
    //   >
    //     <AiOutlineUser className="text-[35px]" />
    //   </div>
    // </div>
  );
}

export default Header;
