import { FaStar } from 'react-icons/fa'

export default function ProjectCard() {
  return (
    <div
      className="flex flex-row items-center dark:bg-gray-100 dark:text-black h-24 w-48 border-gray-300 border-1 shadow-2xl"
      style={{ boxShadow: '5px 0px 10px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="bg-red-300 w-8 h-full "></div>
      <div className="w-4/6 flex flex-col items-left h-full justify-around p-3">
        <span className="text-sm font-bold">🇰🇷 테스트</span>
        <span className="text-xs text-gray-300 dark:text-gray-400">0명 참여중</span>
      </div>
      <div className="h-full p-2">
        <FaStar className="text-yellow-400" />
      </div>
    </div>
  )
}
