import { FaStar } from 'react-icons/fa'

import {
  PROJECT_CARD_REAL_COLOR_BLUE,
  PROJECT_CARD_REAL_COLOR_GREEN,
  PROJECT_CARD_REAL_COLOR_PINK,
  PROJECT_CARD_REAL_COLOR_PURPLE,
  PROJECT_CARD_REAL_COLOR_RED,
  PROJECT_CARD_REAL_COLOR_YELLOW,
  PROJECT_CARD_RES_COLOR_BLUE,
  PROJECT_CARD_RES_COLOR_GREEN,
  PROJECT_CARD_RES_COLOR_PINK,
  PROJECT_CARD_RES_COLOR_PURPLE,
  PROJECT_CARD_RES_COLOR_RED,
  PROJECT_CARD_RES_COLOR_YELLOW,
} from '@/app/constant/constant'
import { type ProjectCardProps } from '@/app/types/ui/cardTypes'

export default function ProjectCard(props: ProjectCardProps) {
  const cardColor = (color: string) => {
    switch (color) {
      case PROJECT_CARD_RES_COLOR_RED:
        return PROJECT_CARD_REAL_COLOR_RED
      case PROJECT_CARD_RES_COLOR_BLUE:
        return PROJECT_CARD_REAL_COLOR_BLUE
      case PROJECT_CARD_RES_COLOR_GREEN:
        return PROJECT_CARD_REAL_COLOR_GREEN
      case PROJECT_CARD_RES_COLOR_PINK:
        return PROJECT_CARD_REAL_COLOR_PINK
      case PROJECT_CARD_RES_COLOR_PURPLE:
        return PROJECT_CARD_REAL_COLOR_PURPLE
      case PROJECT_CARD_RES_COLOR_YELLOW:
        return PROJECT_CARD_REAL_COLOR_YELLOW
      default:
        return PROJECT_CARD_REAL_COLOR_RED
    }
  }
  return (
    <div
      className="flex flex-row items-center dark:bg-gray-100 dark:text-black h-24 xl:w-56 md:w-48 w-32 border-gray-300 border-1 shadow-2xl"
      style={{ boxShadow: '5px 0px 10px rgba(0, 0, 0, 0.1)' }}
    >
      <div className={`${cardColor(props.projectInfo.color)} w-8 h-full`}></div>
      <div className="w-4/6 flex flex-col items-left h-full justify-around p-3">
        <span className="text-sm font-bold truncate">{props.projectInfo.name}</span>
        <span className="text-xs text-gray-300 dark:text-gray-400">0명 참여중</span>
      </div>
      <div className="h-full p-2">
        <FaStar className="text-yellow-400" />
      </div>
    </div>
  )
}
