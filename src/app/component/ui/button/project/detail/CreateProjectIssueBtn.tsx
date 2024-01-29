import { FaPlus } from 'react-icons/fa'

import {
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_ISSUE_TODO_VALUE,
} from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { createProjectIssueModalOpenReducer } from '@/app/store/reducers/project/projectModalReducer'

export default function CreateProjectIssueBtn() {
  const detailCategory = useAppSelector((state) => state.projectDetailCategory.detailCategory)
  const dispatch = useAppDispatch()

  const openCreateIssueModal = () => {
    dispatch(createProjectIssueModalOpenReducer(true))
  }
  const issueCategoryString = () => {
    switch (detailCategory) {
      case PROJECT_DETAIL_CATEGORY_TASK:
        return <span>업무 생성</span>
      case PROJECT_DETAIL_CATEGORY_SCHEDULE:
        return <span>일정 생성</span>
      case PROJECT_ISSUE_TODO_VALUE:
        return <span>할일 생성</span>
      default:
        return <span>업무/일정/할일 생성</span>
    }
  }
  return (
    <div className="w-full max-w-sm border border-gray-200 transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 dark:border-gray-700 mb-5 text-center justify-center">
      <button
        className=" w-full justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={openCreateIssueModal}
      >
        <FaPlus className="mr-2" />
        {issueCategoryString()}
      </button>
    </div>
  )
}
