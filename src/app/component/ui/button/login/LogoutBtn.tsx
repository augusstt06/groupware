import { useRouter } from 'next/navigation'

import { deleteToken, getToken } from '@/app/module/hooks/reactHooks/cookie'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { resetReducer } from '@/app/store/reducers/loginInfoReducer'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'

export default function Logout() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accessToken = getToken('access-token')

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
      deleteToken('access-token')
      alert('로그아웃 되었습니다.')
      router.push('/login')
    } catch (err) {
      alert('로그아웃이 실패했습니다.')
    }
  }
  return (
    <>
      <button
        type="button"
        className="text-white bg-indigo-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-indigo-500 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
        onClick={() => {
          void fetchLogout()
        }}
      >
        Logout
      </button>
    </>
  )
}
