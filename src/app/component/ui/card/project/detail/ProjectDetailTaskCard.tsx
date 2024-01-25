import { CgCalendarToday } from 'react-icons/cg'
import { FaCheck } from 'react-icons/fa'

import { type ProjectDetailTaskCardProps } from '@/app/types/ui/cardTypes'
export default function ProjectDetailTaskCard(props: ProjectDetailTaskCardProps) {
  return (
    <>
      <div className="bg-[rgb(255,255,255)] rounded-lg mt-5 truncate">
        <div className="flex flex-col">
          <div className=" flex flex-row justify-around items-center w-full">
            <div className="w-1/5 flex justify-center items-center hidden md:inline-block p-1">
              <div
                className={`${props.cardColor} p-1 rounded-full items-center flex justify-center w-4 lg:w-5`}
              >
                <FaCheck className="text-white lg:w-3 lg:h-3 w-2 h-2 " />
              </div>
            </div>
            <div className="w-full text-center lg:text-left lg:w-4/5 w-full">
              <span className="text-xs md:text-base text-gray-500">{props.title}</span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-around w-full  truncate">
            <div className="w-7 flex justify-center items-center hidden lg:block">
              <div className="p-1 w-7 items-center">
                <CgCalendarToday className=" lg:w-5 lg:h-5 w-4 h-4 " />
              </div>
            </div>
            <div className="w-4/5 hidden lg:block">
              <span className="text-xs text-gray-500">{props.time}</span>
            </div>
          </div>
          <div className="w-full p-1">
            <div className=" bg-gray-300 w-3 h-3 lg:w-5 lg:h-5 rounded-full"></div>
          </div>
        </div>
        <div className={`${props.cardColor} h-2`}></div>
      </div>
    </>
  )
}
