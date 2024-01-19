'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import BoardItemHub from '@/app/component/page/main/hub/board/item/BoardItemHub'
import BoardHubInput from '@/app/component/ui/input/board/BoardHubInput'
import BoardWriteModal from '@/app/component/ui/modal/board/BoardWriteModal'
import Pagination from '@/app/component/ui/pagination/Pagination'
import {
  API_SUCCESS_CODE,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import {
  API_URL_POSTINGS_LIST,
  API_URL_POSTINGS_MY_ALL,
} from '@/app/constant/route/api-route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'
import {
  type FailResponseType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import {
  type BoardListResponsetype,
  type BoardResponseType,
  type MyBoardType,
} from '@/app/types/variableTypes'

export default function BoardCategory() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const query = useSearchParams().get('name')
  const searchInput = useInput('')
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  const myBoardState = useAppSelector((state) => state.boardCategory.myBoard)

  const [currentBoard, setCurrentBoard] = useState<MyBoardType>({
    id: '',
    groupUUID: '',
    name: '',
    createdAt: '',
    updatedAt: '',
  })
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))

  const [boardList, setBoardList] = useState<BoardListResponsetype[]>([])
  const [pageSize, setPageSize] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState<number>(0)

  const convertBoardId = () => {
    const currentBoard = myBoardState.filter((data) => data.name === query)[0]
    setCurrentBoard(currentBoard)
  }

  const fetchGetBoardPostings = async () => {
    try {
      const fetchGetBoardListProps: ModuleGetFetchProps = {
        params: {
          limit: 10,
          offset: 10 * pageNumber,
        },
        fetchUrl: API_URL_POSTINGS_MY_ALL,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await moduleGetFetch<BoardResponseType>(fetchGetBoardListProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      const resBoardList = (res as SuccessResponseType<BoardResponseType>).result.data

      const filterList = resBoardList.filter((data) => data.boardId === Number(currentBoard.id))

      if (pageSize === 1) {
        const pageSize = Math.ceil(
          (res as SuccessResponseType<BoardResponseType>).result.total / 10,
        )
        setPageSize(pageSize)
      }
      setBoardList(filterList)
    } catch (err) {}
  }

  const fetchGetSearchPostings = async () => {
    try {
      const fetchSeachPostingsProps: ModuleGetFetchProps = {
        params: {
          boardId: currentBoard.id,
          limit: 10,
          offset: 10 * pageNumber,
          keyword: searchInput.value,
        },
        fetchUrl: API_URL_POSTINGS_LIST,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await moduleGetFetch<BoardResponseType>(fetchSeachPostingsProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      const resSearchBoardList = (res as SuccessResponseType<BoardResponseType>).result.data
      setBoardList(resSearchBoardList)
    } catch (err) {}
  }
  const clickSearchPostings = () => {
    void fetchGetSearchPostings()
  }

  useEffect(() => {
    if (isModalOpen) {
      dispatch(openBoardWriteModalReducer())
    }
    convertBoardId()
    void fetchGetBoardPostings()
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [currentBoard, pageNumber, pageSize, query])

  return (
    <main className="md:w-[50rem] w-[35rem] h-4/5 flex flex-col z-1 items-center">
      <div className="md:w-4/5 w-full flex flex-col items-center">
        <div className="w-full p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
          <div className="p-2 font-bold md:text-lg text-base">
            <span>{currentBoard.name}</span>
          </div>

          <BoardHubInput searchInput={searchInput} clickSearchPostings={clickSearchPostings} />

          <BoardItemHub boardList={boardList} />
        </div>
        {boardList !== undefined ? (
          <Pagination size={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        ) : (
          <></>
        )}
      </div>

      {isModalOpen ? <BoardWriteModal currentBoard={currentBoard} /> : <></>}
    </main>
  )
}
