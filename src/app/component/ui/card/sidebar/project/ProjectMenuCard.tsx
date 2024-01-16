import { FaRegStar } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { PiProjectorScreenChartLight } from 'react-icons/pi'

export default function ProjectMenuCard() {
  const menuList = [
    {
      title: '전체',
      icon: <GiHamburgerMenu className="w-6 h-6 mr-5" />,
    },
    { title: '참여중인 프로젝트', icon: <PiProjectorScreenChartLight className="w-6 h-6 mr-5" /> },
    { title: '중요 프로젝트', icon: <FaRegStar className="w-6 h-6 mr-5" /> },
  ]
  return (
    <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
      {menuList.map((data) => (
        <div
          className=" p-5 flex flex-row ransition ease-in-out duration-300  hover:bg-indigo-400 hover:text-white hover:dark:bg-indigo-400 "
          key={data.title}
        >
          {data.icon}
          <span>{data.title}</span>
        </div>
      ))}
    </div>
  )
}
