import { FaPlus } from 'react-icons/fa'

import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { createProjectIssueModalOpenReducer } from '@/app/store/reducers/project/projectModalReducer'

export default function CreateProjectIssueBtn() {
  const dispatch = useAppDispatch()
  const openCreateIssueModal = () => {
    dispatch(createProjectIssueModalOpenReducer())
  }
  return (
    <div className="w-full max-w-sm border border-gray-200 transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 dark:border-gray-700 mb-5 text-center justify-center">
      <button
        className=" w-full justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={openCreateIssueModal}
      >
        <FaPlus className="mr-2" />
        <span>업무/일정/할일 생성</span>
      </button>
    </div>
  )
}
