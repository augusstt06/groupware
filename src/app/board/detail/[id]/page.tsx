'use client'
// 상세페이지
import { useEffect, useState } from 'react'

import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import { FaComment, FaHeart, FaRegHeart } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import { MdRemoveRedEye } from 'react-icons/md'

import Comment from '@/app/component/page/board/comment/Comment'
import WriteComment from '@/app/component/page/board/comment/WriteComment'
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
  type FailResponseType,
  type FetchResponseType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'

const Viewbox = dynamic(async () => import('../../../component/ui/editor/TextViewer'), {
  ssr: false,
})
export default function BoardDetail() {
  const param = useParams()
  const router = useRouter()
  type DetailResponseType = {
    content: string
    createdAt: string
    id: number
    name: string
    position: string
    title: string
    updatedAt: string
    writerId: number
  }
  const [content, setContent] = useState<DetailResponseType>()
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
  const fetchFetPostingDetail = async () => {
    try {
      const res = await moduleGetFetch<FetchResponseType<DetailResponseType>>(
        fetchGetPostingDetailProps,
      )
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const contentRes = (res as SuccessResponseType<DetailResponseType>).result
      setContent(contentRes)
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
    <>
      {content != null ? (
        <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 pb-10 md:ml-10 md:mr-10 ml-5 z-1">
          <Sidebar title={BOARD} />
          <div className="w-4/5 rounded md:col-span-3 mr-10 col-span-4 bg-gray-100 dark:bg-gray-500 dark:text-white p-5">
            <div className="">
              <div
                className="flex flex-row mb-3 items-center cursor-pointer inline w-20 hover:font-bold"
                onClick={moveBoardListPage}
              >
                <IoIosArrowBack className="mr-2" />
                <span className="text-xs">목록보기</span>
              </div>

              <div className="flex flex-col border-b-2 border-gray-300 pb-2">
                <span className="text-xl font-bold mb-2">{content.title}</span>
                <span className="text-xs">
                  {content.name}({content.position})
                </span>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row w-2/5 justify-start items-center text-gray-400">
                    <span className="text-xs justify-around items-center mr-3">
                      {moduleConvertDate(content?.createdAt).split(' ')[0]}
                    </span>
                    {/* 조회수 */}
                    <div className="flex flex-row text-xs justify-around items-center w-6 mr-2">
                      <MdRemoveRedEye />
                      <span>3</span>
                    </div>
                    {/* 좋아요 */}
                    <div className="flex flex-row text-xs justify-around items-center w-6 mr-2">
                      <FaHeart className="text-red-400" />
                      <span>8</span>
                    </div>
                    {/* 댓글 수 */}
                    <div className="flex flex-row text-xs justify-around items-center w-6">
                      <FaComment />
                      <span>3</span>
                    </div>
                  </div>
                  {/* FIXME: 본인 글에만 표시 */}
                  <div className="flex flex-row items-center justify-around w-1/3">
                    <button className="w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
                      수정
                    </button>
                    <button className="w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-gray-300 pt-2 pb-4">
              <Viewbox content={content.content} />
              <div className="border-2 rounded-lg border-red-400 p-2 flex flex-row justify-around items-center w-16 hover:font-bold hover:bg-red-400 hover:text-white text-red-400">
                {/* FIXME: 누르면 아이콘 변경 */}
                {/* <FaHeart className="w-3 h-3" /> */}
                <FaRegHeart className=" w-3 h-3" />
                <span className="text-xs">8</span>
              </div>
            </div>
            <div className="pt-2 pb-2 ">
              <span className="font-bold text-base">댓글 3</span>
              {/* FIXME: 댓글 api 필요 => response로 mapping하기 */}
              <Comment />
              <Comment />
            </div>
            <div>
              <WriteComment />
            </div>
          </div>
        </main>
      ) : (
        <></>
      )}
    </>
  )
}
