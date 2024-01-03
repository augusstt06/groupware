'use client'
// 상세페이지
import { useEffect, useState } from 'react'

import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import { FaComment, FaHeart } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import { MdRemoveRedEye } from 'react-icons/md'

import Sidebar from '@/app/component/ui/sidebar/Sidebar'
import {
  BOARD,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import { API_URL_POSTINGS } from '@/app/constant/route/api-route-constant'
import { ROUTE_BOARD } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import {
  type ApiRes,
  type FailResponseType,
  type FetchResponseType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
} from '@/app/types/moduleTypes'

const Viewbox = dynamic(async () => import('../../../component/ui/editor/TextViewer'), {
  ssr: false,
})
export default function BoardDetail() {
  // 추후 content reponse 받은것을 바탕으로 Viewer의 props로 넘기기
  const testContent = {
    content: '<p>posting test</p>',
    createdAt: '2023-12-29T16:25:19Z',
    id: 1,
    name: '김충연',
    position: '프론트엔드 개발자',
    title: 'Test',
    updatedAt: '2023-12-29T16:25:19Z',
    writerId: 23,
  }
  const param = useParams()
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const loginCOmpleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const fetchGetPostingDetailProps: ModuleGetFetchProps = {
    params: {
      id: param.id as string,
    },
    fetchUrl: API_URL_POSTINGS,
    header: {
      Authorization: `Bearer ${accessToken}`,
      [KEY_X_ORGANIZATION_CODE]: orgCode,
    },
  }
  // console.log(fetchGetPostingDetailProps)
  const fetchFetPostingDetail = async () => {
    try {
      // FIXME: 현재 500 err
      const res = await moduleGetFetch<FetchResponseType<ApiRes[]>>(fetchGetPostingDetailProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      // console.log(res)
    } catch (err) {}
  }
  const moveBoardListPage = () => {
    router.push(ROUTE_BOARD)
  }
  useEffect(() => {
    void fetchFetPostingDetail()
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCOmpleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [])
  return (
    <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 md:ml-10 md:mr-10 ml-5 z-1">
      <Sidebar title={BOARD} />
      <div className="w-4/5 rounded md:col-span-3 mr-10 col-span-4 bg-gray-100 dark:bg-gray-500 dark:text-white p-5">
        <div className="">
          <div className="flex flex-row mb-3 items-center" onClick={moveBoardListPage}>
            <IoIosArrowBack className="cursor-pointer" />
            <span className="text-sm">목록보기</span>
          </div>

          <div className="flex flex-col  border-b-2 border-gray-300 ">
            <span className="text-xl font-bold mb-2">{testContent.title}</span>
            <span className="text-xs mb-2">
              {testContent.name}({testContent.position})
            </span>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row w-1/3 justify-start items-center text-gray-400">
                <span className="text-xs justify-around items-center mr-3">
                  {moduleConvertDate(testContent.createdAt).split(' ')[0]}
                </span>
                {/* 조회수 */}
                <div className="flex flex-row text-xs justify-around items-center w-1/6">
                  <MdRemoveRedEye />
                  <span>3</span>
                </div>
                {/* 좋아요 */}
                <div className="flex flex-row text-xs justify-around items-center w-1/6">
                  <FaHeart className="text-red-400" />
                  <span>3</span>
                </div>
                {/* 댓글 수 */}
                <div className="flex flex-row text-xs justify-around items-center w-1/6">
                  <FaComment />
                  <span>3</span>
                </div>
              </div>
              {/* FIXME: 본인 글에만 표시 */}
              <div className="flex flex-row items-center justify-around w-1/3">
                <button className="mt-3 mb-3 w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
                  수정
                </button>
                <button className="mt-3 mb-3 w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
        <Viewbox content={testContent.content} />
      </div>
    </main>
  )
}
