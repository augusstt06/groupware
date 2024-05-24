'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

import BoardItemHub from '@/(route)/main/_childs/hub/board/item/BoardItemHub'
import BoardMainInputGroup from '@/_component/input/group/board/BoardMainInputGroup'
import Pagination from '@/_component/pagination/Pagination'
import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, KEY_X_ORGANIZATION_CODE } from '@/_constant/constant'
import {
  API_URL_POSTINGS_LIST,
  API_URL_POSTINGS_MY_ALL,
} from '@/_constant/route/api-route-constant'
import useInput from '@/_module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/_module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/_module/utils/check/moduleCheckUserState'
import { moduleGetCookie } from '@/_module/utils/moduleCookie'
import { moduleGetFetch } from '@/_module/utils/moduleFetch'
import { openBoardWriteModalReducer } from '@/_store/reducers/board/openBoardWriteModalReducer'
import { type ModuleGetFetchProps, type SuccessResponseType } from '@/_types/module'
import {
  type BoardListResponseType,
  type BoardResponseType,
  type MyBoardType,
} from '@/_types/variable'

export default function BoardCategory() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const query = useSearchParams().get('name')
  const searchInput = useInput('')
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const isModalOpen: boolean = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  const myBoardState = useAppSelector((state) => state.boardCategory.myBoard)

  const [currentBoard, setCurrentBoard] = useState<MyBoardType>({
    id: '',
    groupUUID: '',
    name: '',
    createdAt: '',
    updatedAt: '',
  })
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))

  const [boardList, setBoardList] = useState<BoardListResponseType[]>([])
  const [pageSize, setPageSize] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState<number>(0)

  const convertBoardId = () => {
    const currentBoard = myBoardState.filter((data) => data.name === query)[0]
    setCurrentBoard(currentBoard)
  }

  const { data: boardPostingsData } = useQuery({
    queryKey: ['board-postings'],
    queryFn: async () => {
      const fetchProps: ModuleGetFetchProps = {
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
      const res = await moduleGetFetch<BoardResponseType>(fetchProps)
      return res as SuccessResponseType<BoardResponseType>
    },
  })

  const successFetchBoardPostings = () => {
    const boardPostingList = (boardPostingsData as SuccessResponseType<BoardResponseType>).result
    if (pageSize === 1) {
      const pageSize = Math.ceil(boardPostingList?.total / 10)
      setPageSize(pageSize)
    }
    const filterList = boardPostingList.data.filter(
      (data) => data.boardId === Number(currentBoard.id),
    )
    setBoardList(filterList)
  }

  const clickSearchPostings = () => {
    const { data: searchData } = useQuery({
      queryKey: ['search'],
      queryFn: async () => {
        const fetchProps: ModuleGetFetchProps = {
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
        const res = await moduleGetFetch<BoardResponseType>(fetchProps)
        return res as SuccessResponseType<BoardResponseType>
      },
    })
    if (searchData !== undefined) {
      const searchList = searchData.result.data
      setBoardList(searchList)
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      dispatch(openBoardWriteModalReducer())
    }
    convertBoardId()
  }, [currentBoard, pageNumber, pageSize, query])

  useEffect(() => {
    if (boardPostingsData !== undefined) successFetchBoardPostings()
  }, [boardPostingsData])

  useEffect(() => {
    moduleCheckUserState({ loginCompleteState, router, accessToken, setAccessToken })
  }, [accessToken])

  return (
    <main className="w-full h-4/5 sort-vertical-flex">
      <div className="w-full md:w-4/5 sort-vertical-flex">
        <div className="w-full p-2 border border-gray-200 rounded-lg shadow bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 dark:border-gray-700 mb-5">
          <div className="p-2 text-base font-bold md:text-lg">
            <span>{currentBoard.name}</span>
          </div>

          <BoardMainInputGroup
            searchInput={searchInput}
            clickSearchPostings={clickSearchPostings}
          />

          <BoardItemHub boardList={boardList} />
        </div>
        {boardList !== undefined ? (
          <Pagination size={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        ) : (
          <></>
        )}
      </div>
    </main>
  )
}
