import { BsPeopleFill } from 'react-icons/bs'
import { FaPhoneAlt, FaSearch } from 'react-icons/fa'

import DarkmodeBtn from '../../button/DarkmodeBtn'
import LogoutBtn from '../../button/login/LogoutBtn'

import { KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { type GnbHamburgerMenuProps } from '@/app/types/ui/uiTypes'

export default function GnbHamburgerMenu(props: GnbHamburgerMenuProps) {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  return (
    <div className="flex flex-row items-center">
      <a className="md:hidden text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-300 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <FaSearch className="md:w-5 md:h-5 w-4 h-4" />
      </a>
      <a className="md:hidden text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-300 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <FaPhoneAlt className="md:w-5 md:h-5 w-4 h-4" />
      </a>
      <a className="md:hidden text-gray-800 dark:border-gray-900 hover:text-indigo-5  00 dark:hover:text-indigo-300 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <button type="button">
          <BsPeopleFill className="md:w-5 md:h-5 w-4 h-4" />
        </button>
      </a>
      <a className="md:hidden text-gray-800 dark:border-gray-900 dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <DarkmodeBtn />
      </a>
      {/* <a className="md:hidden text-gray-800 dark:border-gray-900 dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        info?
      </a> */}
      <a className="md:hidden text-gray-800 dark:border-gray-900 hover:text-red-500 dark:hover:text-red-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        {accessToken !== ERR_COOKIE_NOT_FOUND ? (
          <LogoutBtn
            isConfirmOpen={props.isConfirmOpen}
            setIsConfirmOpen={props.setIsConfirmOpen}
            confirmValue={props.confirmValue}
            setConfirmValue={props.setConfirmValue}
          />
        ) : (
          <></>
        )}
      </a>
    </div>
  )
}
