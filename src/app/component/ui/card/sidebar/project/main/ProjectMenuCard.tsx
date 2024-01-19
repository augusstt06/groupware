import { FaRegStar } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { PiProjectorScreenChartLight } from 'react-icons/pi'

import {
  PROJECT_SIDEBAR_MENU_ALL,
  PROJECT_SIDEBAR_MENU_IMPORTANT,
  PROJECT_SIDEBAR_MENU_PARTICIPATING,
} from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { changeProjectMainCategoryReducer } from '@/app/store/reducers/project/projectMainCategoryReducer'

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
      return 'p-5 flex flex-row bg-indigo-400 text-white rounded-lg'
    } else {
      return 'p-5 flex flex-row transition ease-in-out duration-500 hover:bg-indigo-400 hover:text-white hover:dark:bg-indigo-400 rounded-lg'
    }
  }
  return (
    <div className="cursor-pointer w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
      {menuList.map((data) => (
        <div
          className={divClassName(data.title)}
          key={data.title}
          onClick={() => {
            handleProjectMainCategory(data.title)
          }}
        >
          {data.icon}
          <span>{data.title}</span>
        </div>
      ))}
    </div>
  )
}
