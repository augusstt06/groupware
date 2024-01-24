import { CgCalendarToday } from 'react-icons/cg'
import { FaCheck } from 'react-icons/fa'

import { type ProjectDetailTaskCardProps } from '@/app/types/ui/cardTypes'
export default function ProjectDetailTaskCard(props: ProjectDetailTaskCardProps) {
  return (
    <>
      <div className="bg-[rgb(255,255,255)] rounded-lg mt-5">
        <div className="flex flex-col">
          <div className=" flex flex-row justify-around items-center w-full p-1">
            <div className="w-1/5 flex justify-center items-center">
              <div className={`bg-${props.cardColor} inline-block p-1 rounded-full items-center`}>
                <FaCheck className="text-white w-3 h-3" />
              </div>
            </div>
            <div className="w-4/5">
              <span className="text-gray-500">{props.title}</span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-around  w-full p-1">
            <div className="w-1/5 flex justify-center items-center">
              <div className="inline-block p-1 w-7 items-center">
                <CgCalendarToday className=" w-5 h-5" />
              </div>
            </div>
            <div className="w-4/5">
              <span className="text-xs text-gray-500">{props.time}</span>
            </div>
          </div>
          <div className="w-full p-1">
            <div className="w-7 bg-gray-300 h-7 rounded-full"></div>
          </div>
        </div>
        <div className={`bg-${props.cardColor} h-2`}></div>
      </div>
    </>
  )
}
