import { FaRegStar } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { PiProjectorScreenChartLight } from 'react-icons/pi'

import {
  PROJECT_SIDEBAR_MENU_ALL,
  PROJECT_SIDEBAR_MENU_IMPORTANT,
  PROJECT_SIDEBAR_MENU_PARTICIPATING,
} from '@/constant/constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { changeProjectMainCategoryReducer } from '@/store/reducers/project/projectMainCategoryReducer'

export default function ProjectMenuCard() {
  const dispatch = useAppDispatch()
  const projectCategory = useAppSelector((state) => state.projectMainCategory.selectProjectMenu)
  const menuList = [
    {
      title: PROJECT_SIDEBAR_MENU_ALL,
      icon: <GiHamburgerMenu className="w-6 h-6 mr-5" />,
    },
    {
      title: PROJECT_SIDEBAR_MENU_PARTICIPATING,
      icon: <PiProjectorScreenChartLight className="w-6 h-6 mr-5" />,
    },
    { title: PROJECT_SIDEBAR_MENU_IMPORTANT, icon: <FaRegStar className="w-6 h-6 mr-5" /> },
  ]
  const handleProjectMainCategory = (title: string) => {
    dispatch(changeProjectMainCategoryReducer(title))
  }
  const divClassName = (selectTitle: string) => {
    if (selectTitle === projectCategory) {
      return 'p-4 flex flex-row bg-indigo-400 text-white rounded-lg'
    } else {
      return 'p-4 flex flex-row transition ease-in-out duration-500 hover:bg-indigo-400 hover:text-white hover:dark:bg-indigo-400 rounded-lg'
    }
  }
  const menuSpan = (title: string) => {
    switch (title) {
      case PROJECT_SIDEBAR_MENU_PARTICIPATING:
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm">참여중인</span>
            <span className="text-sm">프로젝트</span>
          </div>
        )
      case PROJECT_SIDEBAR_MENU_IMPORTANT:
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm">중요</span>
            <span className="text-sm">프로젝트</span>
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
            handleProjectMainCategory(data.title)
          }}
        >
          <div className="flex items-center">{data.icon}</div>
          {menuSpan(data.title)}
        </div>
      ))}
    </div>
  )
}
