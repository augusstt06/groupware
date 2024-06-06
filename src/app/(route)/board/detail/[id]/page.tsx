'use client'

import { useEffect, useState } from 'react'

import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import Comment from '../../_childs/comment/Comment'
import WriteComment from '../../_childs/comment/WriteComment'
import PostingDetailHeader from '../../_childs/detail/PostingDetailHeader'

import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, KEY_X_ORGANIZATION_CODE } from '@/constant/constant'
import { errDefault } from '@/constant/errorMsg'
import {
  API_URL_COMMENT_POSTING,
  API_URL_POSTINGS,
  API_URL_POSTINGS_LIKE,
  API_URL_POSTINGS_UNLIKE,
} from '@/constant/route/api-route-constant'
import { ROUTE_BOARD, ROUTE_ERR_NOT_FOUND_POSTING_DETAIL } from '@/constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/module/utils/check/moduleCheckUserState'
import {
  checkTokenExpired,
  moduleDecodeToken,
  moduleGetCookie,
  moduleRefreshToken,
} from '@/module/utils/moduleCookie'
import { moduleDeleteFetch, moduleGetFetch, modulePostFetch } from '@/module/utils/moduleFetch'
import {
  addPostingLikeReducer,
  deletePostingLikeReducer,
} from '@/store/reducers/board/boardLikeReducer'
import {
  type CustomDecodeTokenType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/types/module'
import { type CommentType, type DetailResponseType } from '@/types/variable'

const Viewbox = dynamic(async () => import('../../../../components/editor/TextViewer'), {
  ssr: false,
})
export default function BoardDetail() {
  const queryClient = useQueryClient()
  const param = useParams()
  const router = useRouter()

  const dispatch = useAppDispatch()
  const likeState = useAppSelector((state) => state.boardLike.postingLikeList)

  const userInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const [commentCount, setCommentCount] = useState<number>(0)
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const decodeToken = moduleDecodeToken(accessToken)
  const accessTokenTime = Number((decodeToken as CustomDecodeTokenType).exp)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const [isRerender, setIsRerender] = useState<boolean>(false)
  const [errorState, setErrorState] = useState({
    isError: false,
    description: '',
  })
  const isTokenExist: boolean = checkTokenExpired(accessTokenTime)

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

  const {
    error: postingError,
    data: postingData,
    refetch,
  } = useQuery<SuccessResponseType<DetailResponseType>>({
    queryKey: ['posting-detail'],
    queryFn: async () => {
      const fetchProps: ModuleGetFetchProps = {
        params: {
          postingId: param.id.toString(),
        },
        fetchUrl: API_URL_POSTINGS,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await moduleGetFetch<DetailResponseType>(fetchProps)
      return res as SuccessResponseType<DetailResponseType>
    },
  })
  const isPostLike: boolean = likeState?.includes(postingData?.result?.id as number)
  const isAuthor = postingData?.result?.name === userInfo.name
  const moveBoardListPage = () => {
    router.push(ROUTE_BOARD)
  }

  const { mutate: likeMutation } = useMutation({
    mutationKey: ['like'],
    mutationFn: async () =>
      modulePostFetch<string>({
        data: {
          postingId: postingData?.result.id,
        },
        fetchUrl: API_URL_POSTINGS_LIKE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }),
    onSuccess: async () => {
      await refetch()
      await queryClient.invalidateQueries({ queryKey: ['posting-detail'] })
      dispatch(addPostingLikeReducer(postingData?.result.id as number))
    },
    onError: () => {
      alert(errDefault('좋아요'))
    },
  })
  const { mutate: unLikeMutation } = useMutation({
    mutationKey: ['unlike'],
    mutationFn: async () =>
      await modulePostFetch<string>({
        data: {
          postingId: postingData?.result.id,
        },
        fetchUrl: API_URL_POSTINGS_UNLIKE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }),
    onSuccess: async () => {
      await refetch()
      await queryClient.invalidateQueries({ queryKey: ['posting-detail'] })
      dispatch(deletePostingLikeReducer(postingData?.result.id as number))
    },
    onError: () => {
      alert(errDefault('좋아요'))
    },
  })

  const clickLike = () => {
    if (isPostLike) unLikeMutation()
    else likeMutation()
  }

  const { mutate: deletePosting } = useMutation({
    mutationKey: ['delete-posting'],
    mutationFn: async () =>
      await moduleDeleteFetch<string>({
        params: {
          postingId: postingData?.result.id as number,
        },
        fetchUrl: API_URL_POSTINGS,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }),
    onSuccess: () => {
      router.back()
    },
    onError: () => {
      alert(errDefault('게시글 삭제'))
    },
  })

  const clickDelete = () => {
    deletePosting()
  }

  if (postingError !== null) {
    setErrorState({ isError: true, description: errDefault('게시글') })
  }

  useEffect(() => {
    if (isTokenExist) {
      void moduleRefreshToken(accessToken)
    }
    moduleCheckUserState({ loginCompleteState, router, accessToken, setAccessToken })
  }, [accessToken])

  useEffect(() => {
    if (errorState.isError) {
      router.push(ROUTE_ERR_NOT_FOUND_POSTING_DETAIL)
    }
  }, [isRerender, postingData?.result.id, accessToken])

  useEffect(() => {
    if (postingData?.result !== undefined) {
      if (postingData.result.comments !== undefined) {
        const commentsNum = countComments(postingData.result.comments)
        setCommentCount(commentsNum)
      }
    }
  }, [postingData, doRerender])

  return (
    <>
      {postingData?.result !== undefined ? (
        <section className="w-full pl-5 pr-5 ml-5 sort-vertical-flex h-4/5 ">
          <div className="w-4/5 md:col-span-3 mr-10 col-span-4 dark:text-white p-5 border-2 rounded-xl shadow mb-5 bg-[#f5f7fc]  bg-opacity-70 dark:bg-opacity-10">
            <PostingDetailHeader
              moveBoardListPage={moveBoardListPage}
              commentCount={commentCount}
              content={postingData?.result}
              isAuthor={isAuthor}
              clickDelete={clickDelete}
            />
            <div className="pt-5 pb-5 space-y-5">
              <Viewbox content={postingData.result.content} />
              <div
                className="justify-around w-16 p-1 text-red-400 border-2 border-red-400 rounded-lg cursor-pointer smooth-transition sort-row-flex hover:font-bold hover:bg-red-400 hover:text-white"
                onClick={clickLike}
              >
                {isPostLike ? <FaHeart className="w-3 h-3" /> : <FaRegHeart className="w-3 h-3 " />}
                <span className="text-xs">{postingData.result.like}</span>
              </div>
            </div>
            <div className="pt-2 pb-2 pl-2 pr-2 border-2 border-gray-300 rounded-lg ">
              <span className="text-base font-medium">댓글 {commentCount}</span>
              {postingData?.result.comments?.map((data) => (
                <div key={data.content} className="border-gray-300 border-b-1">
                  <Comment
                    comments={data}
                    postingID={postingData?.result.id}
                    url={API_URL_COMMENT_POSTING}
                    refetch={refetch}
                  />
                </div>
              ))}
            </div>
            <div>
              <WriteComment
                postingID={postingData?.result.id}
                parentID={null}
                url={API_URL_COMMENT_POSTING}
                refetch={refetch}
              />
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  )
}
