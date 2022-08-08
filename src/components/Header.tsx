import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEventHandler, useState } from 'react';
import { AiOutlineBell, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../lib/util';
import { logOut, userState } from '../redux/slices/userSlices/userSlices';

interface Menu {
  id: number;
  value: string;
  isCurrent: boolean;
  href: string;
}

const menu: Menu[] = [
  {
    id: 1,
    value: 'Home',
    isCurrent: true,
    href: 'home',
  },
  {
    id: 2,
    value: 'Team',
    isCurrent: false,
    href: 'team',
  },
  {
    id: 3,
    value: 'Project',
    isCurrent: false,
    href: 'project',
  },
  {
    id: 4,
    value: 'Calendar',
    isCurrent: false,
    href: 'calendar',
  },
  {
    id: 5,
    value: 'Report',
    isCurrent: false,
    href: 'report',
  },
];
const profileManu = ['Your Profile', 'Settings'];

const updateActiveNav = (id: number) => {
  menu?.forEach((i) => {
    if (id === i.id) i.isCurrent = true;
    else i.isCurrent = false;
  });
};

interface NavProps {
  className: string;
}

function Nav({ className }: NavProps) {
  return (
    <div>
      {menu.map((v, i) => (
        <Link href={`/${v.href}`} key={i}>
          <a
            onClick={() => updateActiveNav(v.id)}
            className={`${
              v.isCurrent ? 'bg-gray-900 text-white' : 'text-gray-300'
            } ${className}`}
          >
            {v.value}
          </a>
        </Link>
      ))}
    </div>
  );
}

interface NavProfileProps {
  className: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
const NavProfile = ({ className, onClick }: NavProfileProps) => {
  return (
    <div>
      {profileManu.map((v, i) => (
        <Link href="#" key={i}>
          <a className={className}>{v}</a>
        </Link>
      ))}
      <button className={`${className} w-full text-left`} onClick={onClick}>
        Sign out
      </button>
    </div>
  );
};

function Header() {
  const userInfo = useSelector(userState);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openProfileMenu, setOpenProfileMenu] = useState<Boolean>(false);
  const [showHideMenu, setShowHideMenu] = useState<Boolean>(false);
  const [iconX, setIconX] = useState<Boolean>(false);
  const logout = async () => {
    await axiosInstance.post('/v1/user/logout');
    dispatch(logOut());
  };
  const handleOpenProfileMenu = () => setOpenProfileMenu((prev) => !prev);
  const handleShowHideMenu = () => {
    setShowHideMenu((prev) => !prev);
    setIconX((prev) => !prev);
  };

  return (
    <div className="w-screen h-[6%] bg-gray-800">
      <div className="flex px-3 gap-5 items-center">
        <div className="relitive mt-2">
          <Image
            src="/images/profile.png"
            alt="E Staduim"
            width={40}
            height={40}
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
        </div>
        <div className="flex-1">
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Nav className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" />
            </div>
          </div>
        </div>
        <div className="md:flex items-center gap-2 hidden">
          <button
            type="button"
            className="bg-gray-800 p-1 rounded-full text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <AiOutlineBell className="h-6 w-6 hover:text-white text-gray-400" />
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
              !openProfileMenu ? 'hidden' : 'absolute'
            } origin-top-right absolute ease-in right-4 w-48 top-12 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <NavProfile
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={logout}
            />
          </div>
        </div>
        <div className="md:hidden ease-in-out duration-300">
          <button
            onClick={handleShowHideMenu}
            type="button"
            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <AiOutlineMenu
              className={`${iconX ? 'hidden' : 'block'} h-5 w-5`}
            />
            <AiOutlineClose
              className={`${iconX ? 'block' : 'hidden'} h-5 w-5`}
            />
          </button>
        </div>
      </div>
      <div
        className={`${
          showHideMenu ? 'block' : 'hidden'
        } md:hidden bg-gray-800 -m-1.5 w-full mx-auto`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Nav
            className={`hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
          />
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <Image
                src="/images/profile.png"
                alt="E Staduim"
                width={40}
                height={40}
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                {userInfo?.firstName}
              </div>
              <div className="text-sm font-medium leading-none text-gray-400 mt-0.5">
                {userInfo?.email ? userInfo?.email : 'No Email'}
              </div>
            </div>
            <button
              type="button"
              className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <AiOutlineBell className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <NavProfile
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
