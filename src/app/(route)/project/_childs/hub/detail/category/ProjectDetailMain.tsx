'use client'
import { useEffect } from 'react'

import InviteProjectMemberTable from '@/_component/table/project/InviteProjectMemberTable'
import ProjectDetailTable from '@/_component/table/project/ProjectDetailTable'
import { PROJECT_DETAIL_CATEGORY_HOME } from '@/constant/constant'
import { useAppDispatch } from '@/module/hooks/reduxHooks'
import { changeProjectDetailCategoryReducer } from '@/store/reducers/project/projectDetailCategoryReducer'
import { type ProjectDetailMainProps } from '@/types/ui/extra'
import { type ProjectIssueType } from '@/types/variable'

export default function ProjectDetailMain(props: ProjectDetailMainProps) {
  const dispatch = useAppDispatch()
  const isIssueListNull = (list: ProjectIssueType[] | null) => {
    if (list === null || list?.length === 0) return true
    return false
  }

  const renderingIssues = (list: ProjectIssueType[] | null, title: string) => {
    if (!isIssueListNull(list)) {
      return (
        <div className="space-y-3">
          {list?.map((data) => <ProjectDetailTable key={data.id} title={title} issue={data} />)}
        </div>
      )
    }
    return (
      <div className="flex flex-row justify-around w-full ">
        <span className="font-bold">{title} 이슈가 없습니다.</span>
      </div>
    )
  }
  useEffect(() => {
    dispatch(changeProjectDetailCategoryReducer(PROJECT_DETAIL_CATEGORY_HOME))
  }, [])
  return (
    <div className="w-4/5 max-w-7xl flex flex-row items-left rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10">
      <div className="flex flex-row items-center justify-center w-2/3 p-2 mr-4 border-2 rounded-lg shadow-lg dark:border-indigo-300">
        <div className="flex flex-col items-center w-full mb-2 lg:w-4/5">
          <div className="w-full ">
            <div className="flex flex-row justify-around w-2/6 mb-2  md:w-1/6">
              <span className="font-bold">고정</span>
              <span className="font-bold text-indigo-400">{props.pinnedList?.length}</span>
            </div>
            {renderingIssues(props.pinnedList, '고정')}
          </div>
          <div className="w-full mt-10">
            <div className="flex flex-row justify-around w-2/6 mb-2  md:w-1/6">
              <span className="font-bold">전체</span>
              <span className="font-bold text-indigo-400">{props.issueList?.length}</span>
            </div>
            {renderingIssues(props.issueList, '전체')}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/3 p-2 border-2 rounded-lg shadow-lg items-left dark:border-indigo-300 ">
        <div className="flex flex-row justify-around w-2/4 mt-2 mb-2  lg:w-1/4">
          <span className="font-bold">멤버</span>
          <span className="font-bold text-indigo-400">{props.projectInfo?.members.length}</span>
        </div>
        <div className="flex flex-col items-center space-y-4">
          {props.projectInfo?.members.map((data) => (
            <div
              className="w-full border border-t-2 border-b-2 border-gray-300 rounded-lg shadow-lg 2xl:w-4/5 transition ease-in-out duration-300  hover:bg-indigo-300 hover:text-white hover:dark:bg-indigo-500 dark:border-gray-700"
              key={data.id}
            >
              <InviteProjectMemberTable memberInfo={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
