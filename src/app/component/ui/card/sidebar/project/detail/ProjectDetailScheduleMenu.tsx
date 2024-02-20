import { BsRecordCircle } from 'react-icons/bs'
import { FaRegCircle } from 'react-icons/fa6'

import {
  PROJECT_SIDEBAR_SCHEDULE_ALL,
  PROJECT_SIDEBAR_SCHEDULE_INVITE,
  PROJECT_SIDEBAR_SCHEDULE_MY,
} from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { changeProjectDetailScheduleCategoryReducer } from '@/app/store/reducers/project/projectDetailCategoryReducer'

export default function ProjectDetailScheduleMenu() {
  const dispatch = useAppDispatch()
  const scheduleCategory = useAppSelector((state) => state.projectDetailCategory.schedule)
  const menuList = [
    { title: PROJECT_SIDEBAR_SCHEDULE_ALL },
    { title: PROJECT_SIDEBAR_SCHEDULE_MY },
    { title: PROJECT_SIDEBAR_SCHEDULE_INVITE },
  ]
  const divClassName = (selectTitle: string) => {
    if (selectTitle === scheduleCategory) {
      return 'p-5 flex flex-row bg-indigo-400 text-white rounded-lg'
    } else {
      return 'p-5 flex flex-row transition ease-in-out duration-500 hover:bg-indigo-400 hover:text-white hover:dark:bg-indigo-400 rounded-lg'
    }
  }

  const renderIcon = (selectTitle: string) => {
    if (selectTitle === scheduleCategory) {
      return <BsRecordCircle className="w-5 h-5" />
    }
    return <FaRegCircle className="w-5 h-5" />
  }
  const handleScheduleCategory = (selectTitle: string) => {
    dispatch(changeProjectDetailScheduleCategoryReducer(selectTitle))
  }
  const menuSpan = (title: string) => {
    switch (title) {
      case PROJECT_SIDEBAR_SCHEDULE_MY:
        return (
          <div className="flex flex-col justify-center items-center">
            <span className="text-sm">내가 작성한</span>
            <span className="text-sm">일정</span>
          </div>
        )
      case PROJECT_SIDEBAR_SCHEDULE_INVITE:
        return (
          <div className="flex flex-col justify-center items-center">
            <span className="text-sm">초대받은</span>
            <span className="text-sm">일정</span>
          </div>
        )
      default:
        return <span className="text-sm">{title}</span>
    }
  }
  return (
    <div className="cursor-pointer w-full max-w-sm rounded-lg mb-5">
      {menuList.map((data) => (
        <div
          className={divClassName(data.title)}
          key={data.title}
          onClick={() => {
            handleScheduleCategory(data.title)
          }}
        >
          <div className="w-1/5 flex justify-center items-center mr-3">
            {renderIcon(data.title)}
          </div>
          {menuSpan(data.title)}
        </div>
      ))}
    </div>
  )
}
