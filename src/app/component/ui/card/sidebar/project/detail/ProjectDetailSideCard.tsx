import { FaPlus } from 'react-icons/fa'

import NameCard from '../../../main/NameCard'

import ProjectDetailScheduleMenu from './ProjectDetailScheduleMenu'
import ProjectDetailTaskMenu from './ProjectDetailTaskMenu'
import ProjectDetailTodoMenu from './ProjectDetailTodoMenu'

import Button from '@/app/component/ui/button/Button'
import {
  PROJECT_DETAIL_CATEGORY_HOME,
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_DETAIL_CATEGORY_TODO,
} from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { createProjectIssueModalOpenReducer } from '@/app/store/reducers/project/projectModalReducer'

export default function ProjectDetailSideCard() {
  const dispatch = useAppDispatch()
  const detailCategory = useAppSelector((state) => state.projectDetailCategory.detailCategory)
  const renderMenucard = () => {
    switch (detailCategory) {
      case PROJECT_DETAIL_CATEGORY_HOME:
        return <></>
      case PROJECT_DETAIL_CATEGORY_TASK:
        return <ProjectDetailTaskMenu />
      case PROJECT_DETAIL_CATEGORY_SCHEDULE:
        return <ProjectDetailScheduleMenu />
      case PROJECT_DETAIL_CATEGORY_TODO:
        return <ProjectDetailTodoMenu />
    }
  }
  const handleClickCreateIssue = () => {
    dispatch(createProjectIssueModalOpenReducer(true))
  }
  const issueCategoryString = () => {
    switch (detailCategory) {
      case PROJECT_DETAIL_CATEGORY_TASK:
        return <span>업무 생성</span>
      case PROJECT_DETAIL_CATEGORY_SCHEDULE:
        return <span>일정 생성</span>
      case PROJECT_DETAIL_CATEGORY_TODO:
        return <span>할일 생성</span>
      default:
        return <span>업무/일정/할일 생성</span>
    }
  }
  const buttonContent = (
    <>
      <FaPlus className="mr-2" />
      {issueCategoryString()}
    </>
  )
  return (
    <aside className="bg-[#fff] dark:bg-[#545c74] dark:bg-opacity-100 bg-opacity-70 p-3 rounded-lg">
      <NameCard />
      <Button
        buttonContent={buttonContent}
        className="mb-5 w-full transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={handleClickCreateIssue}
      />
      {renderMenucard()}
    </aside>
  )
}
