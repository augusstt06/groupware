'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import BoardCard from '@/components/card/main/BoardCard'
import BoardTab from '@/components/tab/board/BoardTab'
import {
  BOARD_ANNOUNCE,
  BOARD_FREE,
  BOARD_MAIN_TITLE,
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
} from '@/constant/constant'
import {
  API_URL_GET_MY_BOARD,
  API_URL_POSTINGS_MY_ALL,
  API_URL_POSTINGS_MY_PROJECT,
  API_URL_POSTINGS_MY_TEAM,
} from '@/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { moduleGetFetch } from '@/module/utils/moduleFetch'
import { categoryReduer } from '@/store/reducers/board/boardCategoryReducer'
import { type ModuleGetFetchProps, type SuccessResponseType } from '@/types/module'
import {
  type BoardListResponseType,
  type BoardResponseType,
  type MyBoardType,
} from '@/types/variable'

export default function Board() {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => state.userInfo.extraInfo)

  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])

  const myBoardState = useAppSelector((state) => state.boardCategory.myBoard)
  const [selectBoard, setSelectBoard] = useState<string>('')
  const [boardList, setBoardList] = useState<BoardListResponseType[]>([])
  const [pageSize, setPageSize] = useState<number>(1)

  const changeBoard = (name: string) => {
    setSelectBoard(name)
  }

  const { data: myBoardData } = useQuery<SuccessResponseType<MyBoardType[]>>({
    queryKey: ['my-board-category'],
    queryFn: async () => {
      const fetchProps: ModuleGetFetchProps = {
        params: {
          organizationId: userInfo.organizationId,
        },
        fetchUrl: API_URL_GET_MY_BOARD,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await moduleGetFetch<MyBoardType[]>(fetchProps)
      return res as SuccessResponseType<MyBoardType[]>
    },
  })

  const successFetchMyBoard = () => {
    const myBoardCategory = myBoardData?.result as MyBoardType[]
    dispatch(categoryReduer(myBoardCategory))
  }

  // FIXME: api url check
  const decideFetchUrl = () => {
    switch (selectBoard) {
      case BOARD_ANNOUNCE:
        return API_URL_POSTINGS_MY_TEAM
      case BOARD_FREE:
        return API_URL_POSTINGS_MY_PROJECT
      default:
        return API_URL_POSTINGS_MY_ALL
    }
  }

  const {
    data: boardPostingData,
    isLoading,
    refetch,
  } = useQuery<SuccessResponseType<BoardResponseType>>({
    queryKey: ['board-postings'],
    queryFn: async () => {
      const fetchGetBoardListProps: ModuleGetFetchProps = {
        params: {
          limit: 10,
          offset: 0,
        },
        fetchUrl: decideFetchUrl(),
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await moduleGetFetch<BoardResponseType>(fetchGetBoardListProps)
      return res as SuccessResponseType<BoardResponseType>
    },
  })

  useEffect(() => {
    if (boardPostingData !== undefined) {
      const boardPostingList = boardPostingData.result
      if (pageSize === 1) {
        const pageSize = Math.ceil(boardPostingList.total / 10)
        setPageSize(pageSize)
      }
      if (selectBoard !== '') {
        const selectBoardId = myBoardState.filter((data) => data.name === selectBoard)[0].id
        const filterList = boardPostingList.data.filter(
          (data) => data.boardId === Number(selectBoardId),
        )
        setBoardList(filterList)
        return
      }
      setBoardList(boardPostingList.data)
    }
  }, [isLoading])

  useEffect(() => {
    if (myBoardData !== undefined) successFetchMyBoard()
  }, [myBoardData])

  useEffect(() => {
    void refetch()
  }, [selectBoard])

  return (
    <section className="w-full h-4/5 sort-vertical-flex">
      <div className="w-full pl-5 pr-5 sort-vertical-flex md:w-4/5">
        <BoardTab
          title={BOARD_MAIN_TITLE.toUpperCase()}
          selectBoard={selectBoard}
          changeBoard={changeBoard}
        />
        {boardList.length !== 0 ? (
          <section className="grid grid-cols-2 xl:grid-cols-3 place-items-center h-full border-2 border-gray-300 p-5 bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 rounded-lg">
            {boardList.map((data) => (
              <BoardCard key={data.id} content={data} />
            ))}
          </section>
        ) : (
          <div className="rounded-xl w-full h-40 flex items-center justify-center bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-30">
            There are no posts yet.
          </div>
        )}
      </div>
    </section>
  )
}
