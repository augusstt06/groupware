'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import BoardHub from '../component/page/main/hub/board/BoardHub'
import BoardWriteModal from '../component/ui/modal/BoardWriteModal'
import Pagination from '../component/ui/pagination/Pagination'
import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, KEY_X_ORGANIZATION_CODE } from '../constant/constant'
import { API_URL_GET_MY_BOARD, API_URL_POSTINGS_MY } from '../constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/moduleCheckUserState'
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
  type FailResponseType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '../types/moduleTypes'
import { type boardListResponsetype, type MyBoardType, type resType } from '../types/variableTypes'

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
  const [myBoardList, setMyBoardList] = useState<MyBoardType[]>([])
  const [boardList, setBoardList] = useState<boardListResponsetype[]>([])
  const [pageSize, setPageSize] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState<number>(0)

  const changeBoard = (name: string) => {
    setSelectBoard(name)
  }
  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)

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

  const fetchGetMyBoard = async () => {
    try {
      const res = await moduleGetFetch<MyBoardType[]>(fetchProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const boardMenu = (res as SuccessResponseType<MyBoardType[]>).result
      dispatch(categoryReduer(boardMenu))
      setMyBoardList(boardMenu)
    } catch (err) {}
  }

  const fetchGetBoardPostings = async () => {
    try {
      const fetchGetBoardListProps: ModuleGetFetchProps = {
        params: {
          limit: 10,
          offset: 10 * pageNumber,
        },
        fetchUrl: API_URL_POSTINGS_MY,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await moduleGetFetch<resType>(fetchGetBoardListProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const resBoardList = (res as SuccessResponseType<resType>).result.data
      if (pageSize === 1) {
        const pageSize = Math.ceil((res as SuccessResponseType<resType>).result.total / 10)
        setPageSize(pageSize)
      }
      if (selectBoard === '') {
        setBoardList(resBoardList)
      } else {
        const selectBoardId = myBoardState.filter((data) => data.name === selectBoard)[0].id

        const filterList = resBoardList.filter((data) => data.boardId === Number(selectBoardId))

        setBoardList(filterList)
      }
    } catch (err) {}
  }
  useEffect(() => {
    if (isModalOpen) {
      dispatch(openBoardWriteModalReducer())
    }
    if (checkTokenExpired(accessTokenTime)) {
      void moduleRefreshToken(accessToken)
    }
    void fetchGetMyBoard()
    void fetchGetBoardPostings()
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [selectBoard])
  return (
    <main className="md:w-[50rem] w-[35rem] h-4/5 flex flex-col items-center">
      <BoardHub
        title="게시판"
        boardList={boardList}
        myBoardList={myBoardList}
        selectBoard={selectBoard}
        changeBoard={changeBoard}
      />

      {isModalOpen ? <BoardWriteModal currentBoard={null} /> : <></>}
      <div className="md:w-4/5 w-full flex flex-col items-center">
        {boardList.length !== 0 ? (
          <Pagination size={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        ) : (
          <></>
        )}
      </div>
    </main>
  )
}
