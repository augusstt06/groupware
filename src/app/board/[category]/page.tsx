'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import BoardItem from '@/app/component/page/main/hub/board/BoardItem'
import BoardHubInput from '@/app/component/ui/input/board/BoardHubInput'
import BoardWriteModal from '@/app/component/ui/modal/BoardWriteModal'
import Pagination from '@/app/component/ui/pagination/Pagination'
import Sidebar from '@/app/component/ui/sidebar/Sidebar'
import {
  BOARD,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import { API_URL_BOARD_ORG_LIST } from '@/app/constant/route/api-route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { categoryReduer } from '@/app/store/reducers/board/boardCategoryReducer'
import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'
import {
  type ApiRes,
  type FailResponseType,
  type FetchResponseType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type PageParam } from '@/app/types/pageTypes'
import { type boardListResponsetype } from '@/app/types/variableTypes'

export default function BoardCategory({ params }: { params: PageParam }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const searchInput = useInput('')
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  const boardCategory = useAppSelector((state) => state.boardCategory.category)

  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))

  const [boardList, setBoardList] = useState<boardListResponsetype[]>()
  const [pageSize, setPageSize] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState<number>(0)

  type resType = {
    postings: [boardListResponsetype]
    total: number
    size: number
  }
  const isCurrentPost = (targetDate: string): boolean => {
    const targetDateTime = new Date(targetDate).getTime()
    const currentTime = new Date().getTime()
    const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000

    return currentTime - targetDateTime <= threeDaysInMilliseconds
  }
  const handleModal = () => {
    dispatch(openBoardWriteModalReducer())
  }

  const convertBoardId = () => {
    switch (boardCategory) {
      case '공지사항':
        return 1
      default:
        return 0
    }
  }
  const fetchGetBoardList = async () => {
    try {
      const boardId = convertBoardId()
      if (boardId === 0) return
      const fetchGetBoardListProps: ModuleGetFetchProps = {
        params: {
          organizationBoardId: boardId,
          limit: 10,
          offset: 10 * pageNumber,
        },
        fetchUrl: API_URL_BOARD_ORG_LIST,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res =
        await moduleGetFetch<FetchResponseType<ApiRes[] | resType>>(fetchGetBoardListProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const resBoardList = (res as SuccessResponseType<resType>).result.postings
      if (pageSize === 1) {
        const pageSize = Math.ceil((res as SuccessResponseType<resType>).result.total / 10)
        setPageSize(pageSize)
      }
      setBoardList(resBoardList)
    } catch (err) {}
  }

  const fetchGetSearchPostings = async () => {
    try {
      const boardId = convertBoardId()
      const fetchSeachPostingsProps: ModuleGetFetchProps = {
        params: {
          organizationBoardId: boardId,
          limit: 10,
          offset: 10 * pageNumber,
          keyword: searchInput.value,
        },
        fetchUrl: API_URL_BOARD_ORG_LIST,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res =
        await moduleGetFetch<FetchResponseType<ApiRes[] | resType>>(fetchSeachPostingsProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const resSearchBoardList = (res as SuccessResponseType<resType>).result.postings
      setBoardList(resSearchBoardList)
    } catch (err) {}
  }
  const clickSearchPostings = () => {
    void fetchGetSearchPostings()
  }

  useEffect(() => {
    dispatch(categoryReduer(params.category))
    void fetchGetBoardList()

    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [boardCategory, pageNumber])
  return (
    <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 md:ml-10 md:mr-10 ml-5 z-1">
      <Sidebar title={BOARD} />
      <div className="md:col-span-3 mr-10 col-span-4">
        <div className="md:w-4/5 w-full flex flex-col items-center">
          <div className="w-full p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
            <div className="p-2 font-bold md:text-lg text-base">
              <span>{boardCategory}</span>
            </div>

            <BoardHubInput searchInput={searchInput} clickSearchPostings={clickSearchPostings} />

            {boardList !== undefined ? (
              boardList.length !== 0 ? (
                boardList.map((data) => (
                  <BoardItem
                    key={data.id}
                    boardListItem={data}
                    isCurrent={isCurrentPost(data.createdAt)}
                  />
                ))
              ) : (
                <div className="p-10 text-center">게시글이 없습니다.</div>
              )
            ) : (
              <></>
            )}
          </div>
          {boardList !== undefined ? (
            <Pagination size={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          ) : (
            <></>
          )}
        </div>

        {isModalOpen ? <BoardWriteModal onClick={handleModal} /> : <></>}
      </div>
    </main>
  )
}
