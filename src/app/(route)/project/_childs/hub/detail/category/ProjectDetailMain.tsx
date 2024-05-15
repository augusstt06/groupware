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
      <div className=" w-full flex flex-row justify-around">
        <span className="font-bold">{title} 이슈가 없습니다.</span>
      </div>
    )
  }
  useEffect(() => {
    dispatch(changeProjectDetailCategoryReducer(PROJECT_DETAIL_CATEGORY_HOME))
  }, [])
  return (
    <div className="w-4/5 max-w-7xl flex flex-row items-left rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10">
      <div className="w-2/3 p-2 flex flex-row justify-center items-center rounded-lg mr-4 rounded-lg shadow-lg border-2 dark:border-indigo-300">
        <div className="flex flex-col mb-2 w-full lg:w-4/5 items-center">
          <div className=" w-full">
            <div className=" w-2/6 md:w-1/6 flex flex-row justify-around mb-2">
              <span className="font-bold">고정</span>
              <span className="font-bold text-indigo-400">{props.pinnedList?.length}</span>
            </div>
            {renderingIssues(props.pinnedList, '고정')}
          </div>
          <div className="mt-10 w-full">
            <div className=" w-2/6 md:w-1/6 flex flex-row justify-around mb-2">
              <span className="font-bold">전체</span>
              <span className="font-bold text-indigo-400">{props.issueList?.length}</span>
            </div>
            {renderingIssues(props.issueList, '전체')}
          </div>
        </div>
      </div>
      <div className="w-1/3 p-2 flex flex-col items-left border-2 rounded-lg border-2 dark:border-indigo-300 rounded-lg shadow-lg ">
        <div className=" w-2/4 lg:w-1/4 flex flex-row justify-around mb-2 mt-2">
          <span className="font-bold">멤버</span>
          <span className="font-bold text-indigo-400">{props.projectInfo?.members.length}</span>
        </div>
        <div className="flex flex-col items-center space-y-4">
          {props.projectInfo?.members.map((data) => (
            <div
              className="2xl:w-4/5 w-full transition ease-in-out duration-300 border-t-2 border-b-2  hover:bg-indigo-300 hover:text-white hover:dark:bg-indigo-500 dark:border-gray-700 border border-gray-300 rounded-lg shadow-lg"
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
