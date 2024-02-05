'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import BoardHub from '../component/page/main/hub/board/BoardHub'
import BoardWriteModal from '../component/ui/modal/board/BoardWriteModal'
import {
  BOARD_CATEGORY_PROJECT,
  BOARD_CATEGORY_TEAM,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
} from '../constant/constant'
import {
  API_URL_GET_MY_BOARD,
  API_URL_POSTINGS_MY_ALL,
  API_URL_POSTINGS_MY_PROJECT,
  API_URL_POSTINGS_MY_TEAM,
} from '../constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/check/moduleCheckUserState'
import {
  checkTokenExpired,
  moduleDecodeToken,
  moduleGetCookie,
  moduleRefreshToken,
} from '../module/utils/moduleCookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import { categoryReduer } from '../store/reducers/board/boardCategoryReducer'
import {
  type CustomDecodeTokenType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '../types/moduleTypes'
import {
  type BoardListResponseType,
  type BoardResponseType,
  type MyBoardType,
} from '../types/variableTypes'

import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'

export default function Board() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const decodeToken = moduleDecodeToken(accessToken)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const accessTokenTime = Number((decodeToken as CustomDecodeTokenType).exp)
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const myBoardState = useAppSelector((state) => state.boardCategory.myBoard)
  const [selectBoard, setSelectBoard] = useState<string>('')
  const [boardList, setBoardList] = useState<BoardListResponseType[]>([])
  const [pageSize, setPageSize] = useState<number>(1)

  const changeBoard = (name: string) => {
    setSelectBoard(name)
  }
  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)

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

  const decideFetchUrl = () => {
    switch (selectBoard) {
      case BOARD_CATEGORY_TEAM:
        return API_URL_POSTINGS_MY_TEAM
      case BOARD_CATEGORY_PROJECT:
        return API_URL_POSTINGS_MY_PROJECT
      default:
        return API_URL_POSTINGS_MY_ALL
    }
  }

  const { data: boardPostingData } = useQuery<SuccessResponseType<BoardResponseType>>({
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
  const successFetchBoardPostings = () => {
    const boardPostingList = (boardPostingData as SuccessResponseType<BoardResponseType>).result
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

  useEffect(() => {
    if (checkTokenExpired(accessTokenTime)) {
      void moduleRefreshToken(accessToken)
    }
    moduleCheckUserState({ loginCompleteState, router, accessToken, setAccessToken })
  }, [accessToken])

  useEffect(() => {
    if (isModalOpen) {
      dispatch(openBoardWriteModalReducer())
    }
  }, [isModalOpen])

  useEffect(() => {
    if (boardPostingData !== undefined) successFetchBoardPostings()
  }, [selectBoard, boardPostingData])

  useEffect(() => {
    if (myBoardData !== undefined) successFetchMyBoard()
  }, [myBoardData])

  return (
    <main className="w-10/12 2xl:w-2/3 h-4/5 flex flex-col items-center">
      <BoardHub
        title="게시판"
        boardList={boardList}
        myBoardList={myBoardData?.result as MyBoardType[]}
        selectBoard={selectBoard}
        changeBoard={changeBoard}
      />

      {isModalOpen ? <BoardWriteModal currentBoard={null} /> : <></>}
    </main>
  )
}
