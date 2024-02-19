// import { FaPhoneAlt, FaSearch } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
// import { HiBellAlert } from 'react-icons/hi2'
import { IoIosArrowDown, IoMdClose } from 'react-icons/io'
// import { IoPersonCircleOutline } from 'react-icons/io5'

import DarkmodeBtn from '../../button/DarkmodeBtn'
import UserStateModal from '../../modal/gnb/UserStateModal'

import { KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { type GnbNormalMenuProps } from '@/app/types/ui/uiTypes'

export default function GnbNormalMenu(props: GnbNormalMenuProps) {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  // const iconList = [
  //   { title: 'search', icon: <FaSearch className="w-4 h-4" /> },
  //   { title: 'phone', icon: <FaPhoneAlt className="w-4 h-4" /> },
  //   { title: 'alert', icon: <HiBellAlert className="w-5 h-5" /> },
  //   { title: 'pereson', icon: <IoPersonCircleOutline className="w-5 h-5" /> },
  // ]
  return (
    <div className="flex flex-row items-center">
      {/* {iconList.map((data) => (
        <a
          className="cursor-pointer hidden md:inline text-gray-800 dark:border-gray-900 transition ease-in-out duration-200 hover:scale-125 hover:text-indigo-400 dark:hover:text-indigo-500 dark:text-white font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5"
          key={data.title}
        >
          {data.icon}
        </a>
      ))} */}
      <a className="cursor-pointer hidden md:inline text-gray-800 dark:border-gray-900 transition ease-in-out duration-200 hover:scale-125 hover:text-yellow-500 dark:hover:text-yellow-500 dark:text-white font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5">
        <DarkmodeBtn />
      </a>
      {accessToken !== ERR_COOKIE_NOT_FOUND ? (
        <a className="hidden md:inline ">
          <button
            type="button"
            className="text-gray-800 dark:border-gray-900 transition ease-in-out duration-200 hover:scale-125 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5"
            onClick={props.clickUserStateMenu}
          >
            <IoIosArrowDown className="md:w-5 md:h-5 w-4 h-4" />
          </button>
          {props.isUserStateOpen ? (
            <UserStateModal
              isConfirmOpen={props.isConfirmOpen}
              setIsConfirmOpen={props.setIsConfirmOpen}
              confirmValue={props.confirmValue}
              setConfirmValue={props.setConfirmValue}
              setIsUserStateOpen={props.setIsUserStateOpen}
            />
          ) : (
            <></>
          )}
        </a>
      ) : (
        <></>
      )}

      {!props.isDropOpen ? (
        <GiHamburgerMenu
          className="md:hidden rounded-lg focus:outline-none focus:shadow-outline mr-3 cursor-pointer"
          onClick={props.clickDropdownMenu}
        />
      ) : (
        <IoMdClose
          className="md:hidden rounded-lg focus:outline-none focus:shadow-outline mr-3 cursor-pointer"
          onClick={props.clickDropdownMenu}
        />
      )}
    </div>
  )
}
