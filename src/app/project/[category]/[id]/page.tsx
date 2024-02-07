'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'

// import Comment from '@/app/component/page/board/comment/Comment'
import WriteComment from '@/app/component/page/board/comment/WriteComment'
import ProjectScheduleDeatil from '@/app/component/page/project/hub/detail/issue/ProjectScheduleDetail'
import ProjectTaskDetail from '@/app/component/page/project/hub/detail/issue/ProjectTaskDetail'
import {
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_ISSUE_TASK_VALUE,
} from '@/app/constant/constant'
import {
  API_URL_COMMENT_ISSUES,
  API_URL_PROJECT_ISSUE,
} from '@/app/constant/route/api-route-constant'
import { ROUTE_PROJECT } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { type SuccessResponseType } from '@/app/types/moduleTypes'
import { type IssueDatailType } from '@/app/types/variableTypes'

export default function ProjectIssueDetail() {
  const router = useRouter()
  const query = useParams()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
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
          Authorization: `Bearer ${accessToken}`,
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
    <main className="w-10/12 max-w-7xl 2xl:w-2/3 h-4/5 flex flex-col items-center ">
      {issueDetail != null && (
        <div className="w-4/5 rounded mr-10 bg-white dark:bg-gray-700 dark:text-white p-5 border-2">
          <div
            className="flex flex-row mb-3 items-center cursor-pointer inline w-20 hover:font-bold"
            onClick={goProjectIssue}
          >
            <IoIosArrowBack className="mr-2" />
            <span className="text-xs">돌아가기</span>
          </div>
          <div className="flex flex-col border-b-2 border-gray-300 pb-2 truncate">
            <span className="text-xl font-bold mb-2">{issueDetail?.title}</span>
            <span className="text-xs">{issueDetail?.issuer.name}</span>
          </div>
          {renderIssueDetail()}
          <div className="border-b-2 border-t-2 border-gray-300 mt-5 pt-5 pb-5">이슈 코멘트</div>
          <div className="pt-2 pb-2 ">
            <span className="font-bold text-base">댓글 0</span>

            <div className="border-b-1 border-gray-300">
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
