import { CgCalendarToday } from 'react-icons/cg'
import { FaCheck } from 'react-icons/fa'

import { type ProjectDetailTaskCardProps } from '@/_types/ui/card'
export default function ProjectDetailTaskCard(props: ProjectDetailTaskCardProps) {
  return (
    <>
      <div className="bg-[rgb(255,255,255)] rounded-lg mt-5 truncate">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-around w-full ">
            <div className="flex items-center justify-center w-1/5 p-1 lg:inline-block">
              <div
                className={`${props.cardColor} p-1 rounded-full items-center flex justify-center w-4 lg:w-5`}
              >
                <FaCheck className="w-2 h-2 text-white lg:w-3 lg:h-3 " />
              </div>
            </div>
            <div className="w-full text-center lg:text-left lg:w-4/5">
              <span className="text-xs text-gray-500 md:text-base">{props.title}</span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-around w-full truncate ">
            <div className="flex items-center justify-center w-7 lg:block">
              <div className="items-center p-1 w-7">
                <CgCalendarToday className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="hidden w-4/5 lg:block">
              <span className="text-xs text-gray-500">{props.time}</span>
            </div>
          </div>
          <div className="w-full p-1">
            <div className="w-3 h-3 bg-gray-300 rounded-full lg:w-5 lg:h-5"></div>
          </div>
        </div>
        <div className={`${props.cardColor} h-2`}></div>
      </div>
    </>
  )
}
