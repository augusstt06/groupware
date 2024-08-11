'use client'
import { useEffect } from 'react'

import {
  PROJECT_DETAIL_CATEGORY_HOME,
  PROJECT_ISSUE_SCHEDULE_TITLE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_ISSUE_TASK_TITLE,
  PROJECT_ISSUE_TASK_VALUE,
  PROJECT_ISSUE_TODO_TITLE,
  PROJECT_ISSUE_TODO_VALUE,
} from '@/constant/constant'
import { useAppDispatch } from '@/module/hooks/reduxHooks'
import { moduleConvertDate } from '@/module/utils/moduleTime'
import { changeProjectDetailCategoryReducer } from '@/store/reducers/project/projectDetailCategoryReducer'
import {
  type InviteProjectMemberTableProps,
  type ProjectDetailMainProps,
  type ProjectDetailTableProps,
} from '@/types/ui/extra'
import { type ProjectIssueType } from '@/types/variable'

export default function ProjectDetailMain(props: ProjectDetailMainProps) {
  const { projectInfo, issueList, pinnedList } = props
  const dispatch = useAppDispatch()
  const isIssueListNull = (list: ProjectIssueType[] | null) => {
    if (list === null || list?.length === 0) return true
    return false
  }

  const renderingIssues = (list: ProjectIssueType[] | null, title: string) => {
    if (!isIssueListNull(list)) {
      return (
        <div className="space-y-3">
          {list?.map((data) => <DetailTable key={data.id} title={title} issue={data} />)}
        </div>
      )
    }
    return (
      <div className=" flex flex-row justify-around w-full">
        <span className="font-bold">{title} 이슈가 없습니다.</span>
      </div>
    )
  }
  useEffect(() => {
    dispatch(changeProjectDetailCategoryReducer(PROJECT_DETAIL_CATEGORY_HOME))
  }, [])
  return (
    <div className="w-4/5 max-w-7xl flex flex-row items-left rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10">
      <div className="sort-row-flex dark:border-indigo-200 justify-center w-2/3 p-2 mr-4 border-2 rounded-lg shadow-lg">
        <div className="sort-vertical-flex lg:w-4/5 w-full mb-2">
          <div className=" w-full">
            <div className="md:w-1/6 flex flex-row justify-around w-2/6 mb-2">
              <span className="font-bold">고정</span>
              <span className="font-bold text-indigo-400">{pinnedList?.length}</span>
            </div>
            {renderingIssues(pinnedList, '고정')}
          </div>
          <div className="w-full mt-10">
            <div className="md:w-1/6 flex flex-row justify-around w-2/6 mb-2">
              <span className="font-bold">전체</span>
              <span className="font-bold text-indigo-400">{issueList?.length}</span>
            </div>
            {renderingIssues(issueList, '전체')}
          </div>
        </div>
      </div>
      <div className="items-left dark:border-indigo-200 flex flex-col w-1/3 p-2 border-2 rounded-lg shadow-lg">
        <div className="lg:w-1/4 flex flex-row justify-around w-2/4 mt-2 mb-2">
          <span className="font-bold">멤버</span>
          <span className="font-bold text-indigo-400">{projectInfo?.members.length}</span>
        </div>
        <div className="sort-vertical-flex space-y-4">
          {projectInfo?.members.map((data) => (
            <div
              className="smooth-transition 2xl:w-4/5 hover:bg-indigo-300 hover:text-white hover:dark:bg-indigo-500 dark:border-gray-700 w-full border border-t-2 border-b-2 border-gray-300 rounded-lg shadow-lg"
              key={data.id}
            >
              <Table memberInfo={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Table(props: InviteProjectMemberTableProps) {
  const { name, position, teams } = props.memberInfo
  return (
    <div className="sort-row-flex lg:w-2/3 dark:border-gray-700 justify-start w-full p-2 mt-3 mb-3 cursor-pointer">
      <div className="lg:inline hidden p-2 bg-gray-300 rounded-full">img</div>
      <div className="lg:items-start lg:ml-3 sort-vertical-flex w-full">
        <span className="sm:text-lg lg:text-left w-4/5 mb-1 text-sm text-center">{name}</span>
        <div className="lg:inline sort-vertical-flex text-center truncate">
          <span className="2xl:text-sm lg:w-4/5 lg:mr-1 text-xs">{teams[0].name}</span>
          <span className="2xl:text-sm lg:w-4/5 text-xs">{position}</span>
        </div>
      </div>
    </div>
  )
}

function DetailTable(props: ProjectDetailTableProps) {
  const convertCategory = () => {
    switch (props.issue.category) {
      case PROJECT_ISSUE_TASK_VALUE.toUpperCase():
        return PROJECT_ISSUE_TASK_TITLE
      case PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase():
        return PROJECT_ISSUE_SCHEDULE_TITLE
      case PROJECT_ISSUE_TODO_VALUE.toUpperCase():
        return PROJECT_ISSUE_TODO_TITLE
    }
  }
  const sliceTime = () => {
    const time = moduleConvertDate(props.issue.updatedAt, '.', false)
    const [datePart] = time.split(' ')

    return datePart
  }

  return (
    <div>
      <div className="sort-row-flex dark:border-gray-500 dark:text-gray-200 justify-between overflow-x-auto text-black border-2 border-gray-300 rounded-lg">
        <div className="sort-row-flex justify-center w-1/5 h-12 text-center text-black dark:text-white bg-gray-300 dark:bg-[#505050] ">
          <span className="text-sm font-bold">{convertCategory()}</span>
        </div>
        <div className="lg:flex-row flex flex-col justify-between w-4/5 h-12 overflow-y-auto">
          <div className="sort-row-flex justify-center w-full pl-2 pr-2">
            <span className="text-sm">{props.issue.title}</span>
          </div>
          <div className="sort-row-flex justify-around w-full">
            <span className="text-xs">{props.issue.issuer.name}</span>
            <span className="text-xs">{sliceTime()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
