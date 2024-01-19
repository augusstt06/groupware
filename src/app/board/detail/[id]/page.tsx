'use client'

import { useEffect, useState } from 'react'

import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import Comment from '@/app/component/page/board/comment/Comment'
import WriteComment from '@/app/component/page/board/comment/WriteComment'
import PostingDetailHeader from '@/app/component/page/board/detail/PostingDetailHeader'
import BoardWriteModal from '@/app/component/ui/modal/board/BoardWriteModal'
import {
  API_SUCCESS_CODE,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import { errDefault } from '@/app/constant/errorMsg'
import {
  API_URL_POSTINGS,
  API_URL_POSTINGS_LIKE,
  API_URL_POSTINGS_UNLIKE,
} from '@/app/constant/route/api-route-constant'
import {
  ROUTE_BOARD,
  ROUTE_ERR_NOT_FOUND_POSTING_DETAIL,
} from '@/app/constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleDeleteFetch, moduleGetFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import {
  addPostingLikeReducer,
  deletePostingLikeReducer,
} from '@/app/store/reducers/board/boardLikeReducer'
import {
  type FailResponseType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type CommentType, type DetailResponseType } from '@/app/types/variableTypes'

const Viewbox = dynamic(async () => import('../../../component/ui/editor/TextViewer'), {
  ssr: false,
})
export default function BoardDetail() {
  const param = useParams()
  const router = useRouter()

  const dispatch = useAppDispatch()
  const likeState = useAppSelector((state) => state.boardLike.postingLikeList)
  const userInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const [content, setContent] = useState<DetailResponseType>()
  const [commentCount, setCommentCount] = useState<number>(0)
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const [isRerender, setIsRerender] = useState<boolean>(false)
  const [postId, setPostId] = useState<string>('')
  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  const [errorState, setErrorState] = useState({
    isError: false,
    description: '',
  })
  const isPostLike = likeState?.includes(content?.id as number)
  const isAuthor = content?.name === userInfo.name
  const doRerender = () => {
    setIsRerender(!isRerender)
  }

  const countComments = (comments: CommentType[]): number => {
    let sum = 0

    comments.forEach((comment) => {
      sum++

      if (Array.isArray(comment.childComments)) {
        sum += countComments(comment.childComments)
      }
    })

    return sum
  }

  const fetchGetPostingDetail = async (data: ModuleGetFetchProps) => {
    try {
      const res = await moduleGetFetch<DetailResponseType>(data)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)

      const contentRes = (res as SuccessResponseType<DetailResponseType>).result
      setContent(contentRes)
      if (contentRes.comments !== undefined) {
        const commentsNum = countComments(contentRes.comments)
        setCommentCount(commentsNum)
      }
    } catch (err) {
      setErrorState({ isError: true, description: errDefault('게시글') })
    }
  }
  const moveBoardListPage = () => {
    router.push(ROUTE_BOARD)
  }

  const fetchPostingLikeProps: ModulePostFetchProps = {
    data: {
      postingId: content?.id,
    },
    fetchUrl: API_URL_POSTINGS_LIKE,
    header: {
      Authorization: `Bearer ${accessToken}`,
      [KEY_X_ORGANIZATION_CODE]: orgCode,
    },
  }
  const fetchPostingLike = async () => {
    try {
      await modulePostFetch<string>(fetchPostingLikeProps)
      dispatch(addPostingLikeReducer(content?.id as number))
      doRerender()
    } catch (err) {
      alert(errDefault('좋아요'))
    }
  }

  const fetchPostingUnLikeProps: ModulePostFetchProps = {
    data: {
      postingId: content?.id,
    },
    fetchUrl: API_URL_POSTINGS_UNLIKE,
    header: {
      Authorization: `Bearer ${accessToken}`,
      [KEY_X_ORGANIZATION_CODE]: orgCode,
    },
  }
  const fetchPostingUnLike = async () => {
    try {
      await modulePostFetch<string>(fetchPostingUnLikeProps)
      dispatch(deletePostingLikeReducer(content?.id as number))
      doRerender()
    } catch (err) {
      alert(errDefault('좋아요 취소'))
    }
  }

  const clickLike = () => {
    if (isPostLike) void fetchPostingUnLike()
    else void fetchPostingLike()
  }

  const fetchDeletePostingsProps: ModuleGetFetchProps = {
    params: {
      postingId: content?.id as number,
    },
    fetchUrl: API_URL_POSTINGS,
    header: {
      Authorization: `Bearer ${accessToken}`,
      [KEY_X_ORGANIZATION_CODE]: orgCode,
    },
  }
  const fetchDeletePostings = async () => {
    try {
      const res = await moduleDeleteFetch<string>(fetchDeletePostingsProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      router.back()
    } catch (err) {
      alert(errDefault('게시글 삭제'))
    }
  }
  const clickDelete = () => {
    void fetchDeletePostings()
  }

  useEffect(() => {
    setPostId(param.id.toString())
    const fetchGetPostingDetailProps: ModuleGetFetchProps = {
      params: {
        postingId: postId,
      },
      fetchUrl: API_URL_POSTINGS,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }

    if (postId !== '') {
      void fetchGetPostingDetail(fetchGetPostingDetailProps)
    }

    if (errorState.isError) {
      router.push(ROUTE_ERR_NOT_FOUND_POSTING_DETAIL)
    }

    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [isRerender, postId, accessToken])

  return (
    <>
      {content != null ? (
        <main className="md:w-[50rem] w-[35rem] h-4/5 flex flex-col z-1 items-center">
          <div className="w-4/5 rounded md:col-span-3 mr-10 col-span-4 bg-white dark:bg-gray-700 dark:text-white p-5 border-2">
            <PostingDetailHeader
              moveBoardListPage={moveBoardListPage}
              commentCount={commentCount}
              content={content}
              isAuthor={isAuthor}
              clickDelete={clickDelete}
            />
            <div className="border-b-2 border-gray-300 pt-2 pb-4">
              <Viewbox content={content.content} />
              <div
                className="cursor-pointer border-2 rounded-lg border-red-400 p-2 flex flex-row justify-around items-center w-16 hover:font-bold hover:bg-red-400 hover:text-white text-red-400"
                onClick={clickLike}
              >
                {isPostLike ? <FaHeart className="w-3 h-3" /> : <FaRegHeart className=" w-3 h-3" />}
                <span className="text-xs">{content.like}</span>
              </div>
            </div>
            <div className="pt-2 pb-2 ">
              <span className="font-bold text-base">댓글 {commentCount}</span>
              {content.comments?.map((data) => (
                <div key={data.content} className="border-b-1 border-gray-300">
                  <Comment comments={data} postingID={content.id} doRerender={doRerender} />
                </div>
              ))}
            </div>
            <div>
              <WriteComment postingID={content.id} parentID={null} doRerender={doRerender} />
            </div>
            {isModalOpen ? <BoardWriteModal currentBoard={null} /> : <></>}
          </div>
        </main>
      ) : (
        <></>
      )}
    </>
  )
}
