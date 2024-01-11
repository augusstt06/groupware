'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import BoardHub from '../component/page/main/hub/board/BoardHub'
import BoardWriteModal from '../component/ui/modal/BoardWriteModal'
import Pagination from '../component/ui/pagination/Pagination'
import Sidebar from '../component/ui/sidebar/Sidebar'
import {
  BOARD,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
} from '../constant/constant'
import {
  API_URL_BOARD_ORG_CATEGORY_LIST,
  API_URL_BOARD_ORG_LIST,
} from '../constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/moduleCheckUserState'
import {
  checkTokenExpired,
  moduleDecodeToken,
  moduleGetCookie,
  moduleRefreshToken,
} from '../module/utils/moduleCookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import { addBoardCategoryListReducer } from '../store/reducers/board/boardCategoryListReducer'
import { categoryReduer } from '../store/reducers/board/boardCategoryReducer'
import { openBoardWriteModalReducer } from '../store/reducers/board/openBoardWriteModalReducer'
import {
  type ApiRes,
  type CustomDecodeTokenType,
  type FailResponseType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '../types/moduleTypes'
import { type boardListResponsetype, type resType } from '../types/variableTypes'

export default function Board() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const decodeToken = moduleDecodeToken(accessToken)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const accessTokenTime = Number((decodeToken as CustomDecodeTokenType).exp)
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const boardCategory = useAppSelector((state) => state.boardCategory.category)

  const [boardList, setBoardList] = useState<boardListResponsetype[]>()
  const [pageSize, setPageSize] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState<number>(0)

  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  const handleModal = () => {
    dispatch(openBoardWriteModalReducer())
  }
  const fetchProps: ModuleGetFetchProps = {
    params: {
      organizationId: userInfo.organizationId,
    },
    fetchUrl: API_URL_BOARD_ORG_CATEGORY_LIST,
    header: {
      Authorization: `Bearer ${accessToken}`,
      [KEY_X_ORGANIZATION_CODE]: orgCode,
    },
  }
  type boardResType = {
    createdAt: string
    id: number
    name: string
    organizationId: number
    updatedAt: string
  }
  const fetchGetBoardOrgCategoryList = async () => {
    try {
      const res = await moduleGetFetch<boardResType[]>(fetchProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const boardMenu = (res as SuccessResponseType<boardResType[]>).result
      const reducerProps = {
        boardName: '게시판',
        menuList: boardMenu,
      }

      dispatch(addBoardCategoryListReducer(reducerProps))
    } catch (err) {}
  }
  const convertBoardId = () => {
    switch (boardCategory) {
      case '공지사항':
        return 1
      default:
        // FIXME: 추후 수정예정(전체 게시물 api 들어오면)
        return 1
    }
  }
  const fetchGetBoardPostings = async () => {
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
      const res = await moduleGetFetch<ApiRes[] | resType>(fetchGetBoardListProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const resBoardList = (res as SuccessResponseType<resType>).result.postings
      if (pageSize === 1) {
        const pageSize = Math.ceil((res as SuccessResponseType<resType>).result.total / 10)
        setPageSize(pageSize)
      }
      setBoardList(resBoardList)
    } catch (err) {}
  }
  useEffect(() => {
    dispatch(categoryReduer(''))
    if (checkTokenExpired(accessTokenTime)) {
      void moduleRefreshToken(accessToken)
    }
    void fetchGetBoardOrgCategoryList()
    void fetchGetBoardPostings()
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [boardCategory])
  return (
    <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-24 md:ml-10 md:mr-10 ml-5 z-1 ">
      <Sidebar title={BOARD} />
      <div className="md:col-span-3 mr-10 col-span-4">
        <BoardHub title="게시판" boardList={boardList} />

        {isModalOpen ? <BoardWriteModal onClick={handleModal} /> : <></>}
        <div className="md:w-4/5 w-full flex flex-col items-center">
          {boardList !== undefined ? (
            <Pagination size={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  )
}
