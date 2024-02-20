// import { BsPeopleFill } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'

// import { FaPhoneAlt, FaSearch } from 'react-icons/fa'

// import Button from '../../button/Button'
import DarkmodeBtn from '../../../button/DarkmodeBtn'

import { API_SUCCESS_CODE, FALSE, KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { API_URL_LOGOUT } from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { resetUserInfoReducer } from '@/app/store/reducers/main/userInfoReducer'
import { updateLoginCompleteReducer } from '@/app/store/reducers/maintain/maintainReducer'
import { type FailResponseType, type ModulePostFetchProps } from '@/app/types/module'
import { type NavHamburgerMenuProps } from '@/app/types/ui/nav'

export default function NavHamburgerMenu(props: NavHamburgerMenuProps) {
  const { setIsUserStateOpen, handleOpenDialog, changeDialogConfirmFn } = props

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
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
      dispatch(updateLoginCompleteReducer(FALSE))
      dispatch(resetUserInfoReducer())
      setIsUserStateOpen(false)
    } catch (err) {
      alert('로그아웃이 실패했습니다.')
    }
  }
  const handleClickLogout = () => {
    if (attendanceStatus.status === 'in') {
      changeDialogConfirmFn(fetchLogout)
      handleOpenDialog()
    } else {
      void fetchLogout()
    }
  }

  return (
    <div className="flex flex-row items-center mt-2">
      <a className="md:hidden text-gray-800 border-none dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
        <DarkmodeBtn />
      </a>
      <a className="md:hidden cursor-pointer text-gray-800 border-none hover:text-red-500 dark:hover:text-red-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5  focus:outline-none dark:focus:ring-gray-800">
        {accessToken !== ERR_COOKIE_NOT_FOUND ? (
          <FiLogOut className="md:w-5 md:h-5 w-4 h-4" onClick={handleClickLogout} />
        ) : (
          <></>
        )}
      </a>
    </div>
  )
}
