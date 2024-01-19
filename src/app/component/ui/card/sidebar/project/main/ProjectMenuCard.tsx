import { FaRegStar } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { PiProjectorScreenChartLight } from 'react-icons/pi'

import {
  PROJECT_SIDEBAR_MENU_ALL,
  PROJECT_SIDEBAR_MENU_IMPORTANT,
  PROJECT_SIDEBAR_MENU_PARTICIPATING,
} from '@/app/constant/constant'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { changeProjectMainCategoryReducer } from '@/app/store/reducers/project/projectMainCategoryReducer'

export default function ProjectMenuCard() {
  const dispatch = useAppDispatch()
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
  return (
    <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
      {menuList.map((data) => (
        <div
          className=" p-5 flex flex-row ransition ease-in-out duration-300  hover:bg-indigo-400 hover:text-white hover:dark:bg-indigo-400 rounded-lg"
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
