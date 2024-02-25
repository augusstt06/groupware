import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosArrowDown, IoMdClose } from 'react-icons/io'

import DarkmodeBtn from '../../button/DarkmodeBtn'
import UserStateModal from '../../modal/gnb/UserStateModal'

import { KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { type NavNormalMenuProps } from '@/app/types/ui/nav'

export default function NormalNav(props: NavNormalMenuProps) {
  const {
    changeDialogConfirmFn,
    handleOpenDialog,
    clickUserStateMenu,
    isUserStateOpen,
    isDropOpen,
    clickDropdownMenu,
    setIsUserStateOpen,
  } = props

  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)

  return (
    <div className="flex flex-row items-center">
      <a className="cursor-pointer hidden md:inline text-gray-800 dark:border-gray-900 transition ease-in-out duration-200 hover:scale-125 hover:text-yellow-500 dark:hover:text-yellow-500 dark:text-white font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5">
        <DarkmodeBtn />
      </a>
      {accessToken !== ERR_COOKIE_NOT_FOUND ? (
        <a className="hidden md:inline ">
          <button
            type="button"
            className="text-gray-800 dark:border-gray-900 transition ease-in-out duration-200 hover:scale-125 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5"
            onClick={clickUserStateMenu}
          >
            <IoIosArrowDown className="md:w-5 md:h-5 w-4 h-4" />
          </button>
          {isUserStateOpen ? (
            <UserStateModal
              changeDialogConfirmFn={changeDialogConfirmFn}
              handleOpenDialog={handleOpenDialog}
              setIsUserStateOpen={setIsUserStateOpen}
            />
          ) : (
            <></>
          )}
        </a>
      ) : (
        <></>
      )}

      {!isDropOpen ? (
        <GiHamburgerMenu
          className="md:hidden rounded-lg focus:outline-none focus:shadow-outline mr-3 cursor-pointer"
          onClick={clickDropdownMenu}
        />
      ) : (
        <IoMdClose
          className="md:hidden rounded-lg focus:outline-none focus:shadow-outline mr-3 cursor-pointer"
          onClick={clickDropdownMenu}
        />
      )}
    </div>
  )
}
