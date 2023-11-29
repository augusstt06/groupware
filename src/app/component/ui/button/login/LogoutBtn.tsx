import { useRouter } from 'next/navigation'

import {
  KEY_ACCESS_TOKEN,
} from '@/app/constant/constant'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/cookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { resetReducer } from '@/app/store/reducers/loginInfoReducer'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'

export default function Logout() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)

  const fetchLogoutProps: ModulePostFetchProps = {
    data: {},
    fetchUrl: process.env.NEXT_PUBLIC_LOGOUT_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const fetchLogout = async () => {
    try {
      await modulePostFetch(fetchLogoutProps)

      dispatch(resetReducer())
      moduleDeleteCookies(
        KEY_ACCESS_TOKEN,
      )
      router.push('/login')
    } catch (err) {
      alert('로그아웃이 실패했습니다.')
    }
  }
  return (
    <>
      <button
        type="button"
        className="text-gray-800 dark:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5  focus:outline-none dark:focus:ring-gray-800"
        onClick={() => {
          void fetchLogout()
        }}
      >
        Logout
      </button>
    </>
  )
}
