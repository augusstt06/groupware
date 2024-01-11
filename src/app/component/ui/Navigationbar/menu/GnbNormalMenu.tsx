import { BsPeopleFill } from 'react-icons/bs'
import { FaPhoneAlt, FaSearch } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosArrowDown, IoMdClose } from 'react-icons/io'

import DarkmodeBtn from '../../button/DarkmodeBtn'
import UserStateModal from '../../modal/UserStateModal'

import { KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { type GnbNormalMenuProps } from '@/app/types/ui/uiTypes'

export default function GnbNormalMenu(props: GnbNormalMenuProps) {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  return (
    <div className="flex flex-row items-center">
      <a className="hidden md:inline text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <FaSearch className="md:w-5 md:h-5 w-4 h-4" />
      </a>
      <a className="hidden md:inline text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <FaPhoneAlt className="md:w-5 md:h-5 w-4 h-4" />
      </a>
      <a className="hidden md:inline text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <button type="button">
          <BsPeopleFill className="md:w-5 md:h-5 w-4 h-4" />
        </button>
      </a>
      <a className="hidden md:inline text-gray-800 dark:border-gray-900 dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <DarkmodeBtn />
      </a>
      {accessToken !== ERR_COOKIE_NOT_FOUND ? (
        <a className="hidden md:inline ">
          <button
            type="button"
            className="text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800"
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
