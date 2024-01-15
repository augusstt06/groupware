'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import BoardItem from '@/app/component/page/main/hub/board/BoardItem'
// import BoardHubInput from '@/app/component/ui/input/board/BoardHubInput'
import BoardWriteModal from '@/app/component/ui/modal/BoardWriteModal'
import Pagination from '@/app/component/ui/pagination/Pagination'
import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import { API_URL_POSTINGS_MY } from '@/app/constant/route/api-route-constant'
// import useInput from '@/app/module/hooks/reactHooks/useInput'
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
import { type PageParam } from '@/app/types/pageTypes'
import {
  type boardListResponsetype,
  type MyBoardType,
  type resType,
} from '@/app/types/variableTypes'

export default function BoardCategory({ params }: { params: PageParam }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  // const searchInput = useInput('')
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

  // const [myBoardList, setMyBoardList] = useState<MyBoardType[]>([])
  const [boardList, setBoardList] = useState<boardListResponsetype[]>([])
  const [pageSize, setPageSize] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState<number>(0)

  const isCurrentPost = (targetDate: string): boolean => {
    const targetDateTime = new Date(targetDate).getTime()
    const currentTime = new Date().getTime()
    const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000

    return currentTime - targetDateTime <= threeDaysInMilliseconds
  }

  const convertBoardId = () => {
    let boardName: string
    const regex = /^\/board\/(.*)$/
    const match = (pathname.match(regex) as RegExpMatchArray)[1]
    switch (match) {
      case 'announce':
        boardName = '공지사항'
        break
      case 'free':
        boardName = '자유게시판'
        break
      default:
        return
    }

    const currentBoard = myBoardState.filter((data) => data.name === boardName)[0]
    setCurrentBoard(currentBoard)
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

      const filterList = resBoardList.filter((data) => data.boardId === Number(currentBoard.id))
      if (pageSize === 1) {
        const pageSize = Math.ceil((res as SuccessResponseType<resType>).result.total / 10)
        setPageSize(pageSize)
      }
      setBoardList(filterList)
    } catch (err) {}
  }

  // const fetchGetSearchPostings = async () => {
  //   try {
  //     const boardId = convertBoardId()
  //     const fetchSeachPostingsProps: ModuleGetFetchProps = {
  //       params: {
  //         organizationBoardId: boardId,
  //         limit: 10,
  //         offset: 10 * pageNumber,
  //         keyword: searchInput.value,
  //       },
  //       fetchUrl: API_URL_BOARD_ORG_LIST,
  //       header: {
  //         Authorization: `Bearer ${accessToken}`,
  //         [KEY_X_ORGANIZATION_CODE]: orgCode,
  //       },
  //     }
  //     const res = await moduleGetFetch<ApiRes[] | resType>(fetchSeachPostingsProps)
  //     if (res.status !== 200) throw new Error((res as FailResponseType).message)
  //     const resSearchBoardList = (res as SuccessResponseType<resType>).result.data
  //     setBoardList(resSearchBoardList)
  //   } catch (err) {}
  // }
  // const clickSearchPostings = () => {
  //   void fetchGetSearchPostings()
  // }

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
  }, [currentBoard, pageNumber, pageSize])

  return (
    <main className="md:w-[50rem] w-[35rem] h-4/5 flex flex-col z-1 items-center">
      <div className="md:w-4/5 w-full flex flex-col items-center">
        <div className="w-full p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
          <div className="p-2 font-bold md:text-lg text-base">
            <span>{currentBoard.name}</span>
          </div>

          {/* <BoardHubInput searchInput={searchInput} clickSearchPostings={clickSearchPostings} /> */}

          {boardList.length !== 0 ? (
            boardList.map((data) => (
              <BoardItem
                key={data.id}
                boardListItem={data}
                isCurrent={isCurrentPost(data.createdAt)}
              />
            ))
          ) : (
            <div className="p-10 text-center">게시글이 없습니다.</div>
          )}
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
