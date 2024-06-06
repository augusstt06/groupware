import { BsRecordCircle } from 'react-icons/bs'
import { FaRegCircle } from 'react-icons/fa'

import { PROJECT_SIDEBAR_TODO_ALL, PROJECT_SIDEBAR_TODO_MY } from '@/constant/constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { changeProjectDetailTodoCategoryReducer } from '@/store/reducers/project/projectDetailCategoryReducer'

export default function ProjectDetailTodoMenu() {
  const dispatch = useAppDispatch()
  const todoCategory = useAppSelector((state) => state.projectDetailCategory.todo)
  const menuList = [{ title: PROJECT_SIDEBAR_TODO_ALL }, { title: PROJECT_SIDEBAR_TODO_MY }]

  const divClassName = (selectTitle: string) => {
    if (selectTitle === todoCategory) {
      return 'p-5 flex flex-row bg-indigo-400 text-white rounded-lg'
    } else {
      return 'p-5 flex flex-row transition ease-in-out duration-500 hover:bg-indigo-400 hover:text-white hover:dark:bg-indigo-400 rounded-lg'
    }
  }
  const renderIcon = (selectTitle: string) => {
    if (selectTitle === todoCategory) {
      return <BsRecordCircle className="w-5 h-5" />
    }
    return <FaRegCircle className="w-5 h-5" />
  }
  const handleScheduleCategory = (selectTitle: string) => {
    dispatch(changeProjectDetailTodoCategoryReducer(selectTitle))
  }

  return (
    <div className="w-full max-w-sm mb-5 rounded-lg cursor-pointer">
      {menuList.map((data) => (
        <div
          className={divClassName(data.title)}
          key={data.title}
          onClick={() => {
            handleScheduleCategory(data.title)
          }}
        >
          <div className="flex items-center justify-center w-1/5 mr-3">
            {renderIcon(data.title)}
          </div>
          {data.title}
        </div>
      ))}
    </div>
  )
}
