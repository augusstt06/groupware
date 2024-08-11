import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosArrowDown, IoMdClose } from 'react-icons/io'

import DarkmodeBtn from '../../button/DarkmodeBtn'
import UserStateModal from '../../modal/nav/UserStateModal'

import { ERR_COOKIE_NOT_FOUND } from '@/constant/errorMsg'
import { createAccessTokenManager } from '@/module/utils/token'
import { type NavNormalMenuProps } from '@/types/ui/nav'

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

  const { getAccessToken } = createAccessTokenManager
  return (
    <div className="flex flex-row items-center">
      <a className="hidden text-gray-800 view-icon smooth-transition md:inline hover:scale-125 hover:text-yellow-500 dark:hover:text-yellow-500 dark:text-white">
        <DarkmodeBtn />
      </a>
      {getAccessToken() !== ERR_COOKIE_NOT_FOUND ? (
        <a className="relative hidden md:inline">
          <button
            type="button"
            className="text-gray-800 view-icon smooth-transition dark:border-gray-900 hover:scale-125 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white"
            onClick={clickUserStateMenu}
          >
            <IoIosArrowDown className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          {isUserStateOpen === true ? (
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

      {isDropOpen === false ? (
        <GiHamburgerMenu
          className="mr-3 rounded-lg cursor-pointer md:hidden focus:outline-none focus:shadow-outline"
          onClick={clickDropdownMenu}
        />
      ) : (
        <IoMdClose
          className="mr-3 rounded-lg cursor-pointer md:hidden focus:outline-none focus:shadow-outline"
          onClick={clickDropdownMenu}
        />
      )}
    </div>
  )
}
