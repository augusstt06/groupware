'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'

import ProjectScheduleDeatil from '../../_childs/hub/detail/issue/ProjectScheduleDetail'
import ProjectTaskDetail from '../../_childs/hub/detail/issue/ProjectTaskDetail'

import WriteComment from '@/(route)/board/_childs/comment/WriteComment'
import {
  KEY_X_ORGANIZATION_CODE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_ISSUE_TASK_VALUE,
} from '@/constant/constant'
import { API_URL_COMMENT_ISSUES, API_URL_PROJECT_ISSUE } from '@/constant/route/api-route-constant'
import { ROUTE_PROJECT } from '@/constant/route/route-constant'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetFetch } from '@/module/utils/fetch'
import { createAccessTokenManager } from '@/module/utils/token'
import { type SuccessResponseType } from '@/types/module'
import { type IssueDatailType } from '@/types/variable'

// import Comment from '@/app/component/page/board/comment/Comment'

export default function ProjectIssueDetail() {
  const router = useRouter()
  const query = useParams()
  const { getAccessToken } = createAccessTokenManager
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])

  const goProjectIssue = () => {
    router.push(ROUTE_PROJECT)
  }
  const { data: issueDetail, refetch } = useQuery({
    queryKey: ['issue-detail'],
    queryFn: async () => {
      const res = await moduleGetFetch<IssueDatailType>({
        params: {
          issueId: Number(query.id),
        },
        fetchUrl: API_URL_PROJECT_ISSUE,
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      return (res as SuccessResponseType<IssueDatailType>).result
    },
  })

  const renderIssueDetail = () => {
    switch (issueDetail?.category) {
      case PROJECT_ISSUE_TASK_VALUE.toUpperCase():
        return <ProjectTaskDetail issue={issueDetail} />
      case PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase():
        return <ProjectScheduleDeatil issue={issueDetail} />
    }
  }

  return (
    <main className="w-10/12 sort-vertical-flex max-w-7xl 2xl:w-2/3 h-4/5 ">
      {issueDetail != null && (
        <div className="w-4/5 p-5 mr-10 bg-white border-2 rounded dark:bg-gray-700 dark:text-white">
          <div
            className="w-20 mb-3 cursor-pointer sort-row-flex hover:font-bold"
            onClick={goProjectIssue}
          >
            <IoIosArrowBack className="mr-2" />
            <span className="text-xs">돌아가기</span>
          </div>
          <div className="pb-2 truncate border-b-2 border-gray-300 sort-vertical-flex">
            <span className="mb-2 text-xl font-bold">{issueDetail?.title}</span>
            <span className="text-xs">{issueDetail?.issuer.name}</span>
          </div>
          {renderIssueDetail()}
          <div className="pt-5 pb-5 mt-5 border-t-2 border-b-2 border-gray-300">이슈 코멘트</div>
          <div className="pt-2 pb-2 ">
            <span className="text-base font-bold">댓글 0</span>

            <div className="border-gray-300 border-b-1">
              {/* <Comment comments={data} postingID={content.id} doRerender={setRerender} /> */}
            </div>
          </div>
          <div>
            <WriteComment
              postingID={issueDetail?.id}
              parentID={null}
              refetch={refetch}
              url={API_URL_COMMENT_ISSUES}
            />
          </div>
        </div>
      )}
    </main>
  )
}
