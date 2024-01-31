import { BsPeopleFill } from 'react-icons/bs'
import { CiLogout } from 'react-icons/ci'
import { FaPhoneAlt, FaSearch } from 'react-icons/fa'

import Button from '../../button/Button'
import DarkmodeBtn from '../../button/DarkmodeBtn'

import { API_SUCCESS_CODE, FALSE, KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { API_URL_LOGOUT } from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { resetUserInfoReducer } from '@/app/store/reducers/main/userInfoReducer'
import { updateLoginCompleteReducer } from '@/app/store/reducers/maintain/maintainReducer'
import { type FailResponseType, type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type GnbHamburgerMenuProps } from '@/app/types/ui/uiTypes'

export default function GnbHamburgerMenu(props: GnbHamburgerMenuProps) {
  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const attendanceStatus = useAppSelector((state) => state.userInfo.attendance)
  const fetchLogout = async () => {
    try {
      const fetchProps: ModulePostFetchProps = {
        data: {},
        fetchUrl: API_URL_LOGOUT,
        header: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const res = await modulePostFetch<string>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      props.setConfirmValue(false)
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
      dispatch(updateLoginCompleteReducer(FALSE))
      dispatch(resetUserInfoReducer())
      props.setIsUserStateOpen(false)
    } catch (err) {
      alert('로그아웃이 실패했습니다.')
    }
  }
  const handleClickLogout = () => {
    if (attendanceStatus.status === 'in') {
      props.setIsConfirmOpen(true)
    } else {
      void fetchLogout()
    }
  }
  const logoutBtnContent = <CiLogout className="md:w-5 md:h-5 w-4 h-4" />

  return (
    <div className="flex flex-row items-center">
      <a className="md:hidden text-gray-800 border-none hover:text-indigo-500 dark:hover:text-indigo-300 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <FaSearch className="md:w-5 md:h-5 w-4 h-4" />
      </a>
      <a className="md:hidden text-gray-800 border-none hover:text-indigo-500 dark:hover:text-indigo-300 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <FaPhoneAlt className="md:w-5 md:h-5 w-4 h-4" />
      </a>
      <a className="md:hidden text-gray-800 border-none hover:text-indigo-5  00 dark:hover:text-indigo-300 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <button type="button">
          <BsPeopleFill className="md:w-5 md:h-5 w-4 h-4" />
        </button>
      </a>
      <a className="md:hidden text-gray-800 border-none dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <DarkmodeBtn />
      </a>
      {/* <a className="md:hidden text-gray-800 border-none dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        info?
      </a> */}
      <a className="md:hidden text-gray-800 border-none hover:text-red-500 dark:hover:text-red-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        {accessToken !== ERR_COOKIE_NOT_FOUND ? (
          <Button buttonContent={logoutBtnContent} className="" onClick={handleClickLogout} />
        ) : (
          <></>
        )}
      </a>
    </div>
  )
}
