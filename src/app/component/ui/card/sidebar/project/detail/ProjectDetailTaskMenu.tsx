import { BsRecordCircle } from 'react-icons/bs'
import { FaRegCircle } from 'react-icons/fa6'

import {
  PROJECT_SIDEBAR_TASK_ALL,
  PROJECT_SIDEBAR_TASK_INVITE,
  PROJECT_SIDEBAR_TASK_MY,
} from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { changeProjectDetailTaskCategoryReducer } from '@/app/store/reducers/project/projectDetailCategoryReducer'

export default function ProjectDetailTaskMenu() {
  const dispatch = useAppDispatch()
  const taskCategory = useAppSelector((state) => state.projectDetailCategory.task)
  const menuList = [
    {
      title: PROJECT_SIDEBAR_TASK_ALL,
    },
    {
      title: PROJECT_SIDEBAR_TASK_MY,
    },
    {
      title: PROJECT_SIDEBAR_TASK_INVITE,
    },
  ]
  const divClassName = (selectTitle: string) => {
    if (selectTitle === taskCategory) {
      return 'p-5 flex flex-row bg-indigo-400 text-white rounded-lg'
    } else {
      return 'p-5 flex flex-row transition ease-in-out duration-500 hover:bg-indigo-400 hover:text-white hover:dark:bg-indigo-400 rounded-lg'
    }
  }
  const renderIcon = (selectTitle: string) => {
    if (selectTitle === taskCategory) {
      return <BsRecordCircle className="w-5 h-5" />
    }
    return <FaRegCircle className="w-5 h-5" />
  }
  const handleTaskCategory = (selectTitle: string) => {
    dispatch(changeProjectDetailTaskCategoryReducer(selectTitle))
  }
  return (
    <div className="cursor-pointer w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
      {menuList.map((data) => (
        <div
          className={divClassName(data.title)}
          key={data.title}
          onClick={() => {
            handleTaskCategory(data.title)
          }}
        >
          <div className="w-1/5 flex justify-center items-center mr-3">
            {renderIcon(data.title)}
          </div>
          <span>{data.title}</span>
        </div>
      ))}
    </div>
  )
}
