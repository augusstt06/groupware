import { BsRecordCircle } from 'react-icons/bs'
import { FaRegCircle } from 'react-icons/fa6'

import {
  PROJECT_SIDEBAR_TASK_ALL,
  PROJECT_SIDEBAR_TASK_INVITE,
  PROJECT_SIDEBAR_TASK_MY,
} from '@/constant/constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { changeProjectDetailTaskCategoryReducer } from '@/store/reducers/project/projectDetailCategoryReducer'

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
      return 'p-5 flex flex-row smooth-transition hover:bg-indigo-400 hover:text-white hover:dark:bg-indigo-400 rounded-lg'
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
  const menuSpan = (title: string) => {
    switch (title) {
      case PROJECT_SIDEBAR_TASK_MY:
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm">내가 작성한</span>
            <span className="text-sm">업무</span>
          </div>
        )
      case PROJECT_SIDEBAR_TASK_INVITE:
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm">초대받은</span>
            <span className="text-sm">업무</span>
          </div>
        )
      default:
        return <span className="text-sm">{title}</span>
    }
  }
  return (
    <div className="w-full max-w-sm mb-5 rounded-lg cursor-pointer">
      {menuList.map((data) => (
        <div
          className={divClassName(data.title)}
          key={data.title}
          onClick={() => {
            handleTaskCategory(data.title)
          }}
        >
          <div className="flex items-center justify-center w-1/5 mr-3">
            {renderIcon(data.title)}
          </div>
          {menuSpan(data.title)}
        </div>
      ))}
    </div>
  )
}
