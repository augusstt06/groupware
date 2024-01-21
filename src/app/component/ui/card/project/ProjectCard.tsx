import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

import {
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
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
import { API_URL_PROJECT_STAR } from '@/app/constant/route/api-route-constant'
import { ROUTE_PROJECT_DETAIL } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type ProjectCardProps } from '@/app/types/ui/cardTypes'

export default function ProjectCard(props: ProjectCardProps) {
  // FIXME: response에 star 들어오면 별모양 바꾸기
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const fetchChangeStarred = async () => {
    const fetchProps: ModulePostFetchProps = {
      data: {
        projectId: props.projectInfo.id,
      },
      fetchUrl: API_URL_PROJECT_STAR,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    await modulePostFetch<string>(fetchProps)
  }
  const handleClickStar = () => {
    void fetchChangeStarred()
  }
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
      className="flex flex-row items-center dark:bg-gray-100 dark:text-black h-24 xl:w-56 md:w-48 w-32 border-gray-300 border-1 shadow-2xl transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
      style={{ boxShadow: '5px 0px 10px rgba(0, 0, 0, 0.1)' }}
    >
      <div className={`${cardColor(props.projectInfo.color)} w-8 h-full`}></div>

      <div className="w-4/6 p-3">
        <Link
          href={`${ROUTE_PROJECT_DETAIL}/${props.projectInfo.id}`}
          className="flex flex-col items-left h-full justify-around"
        >
          <span className="text-sm font-bold truncate">{props.projectInfo.name}</span>
          <span className="text-xs text-gray-300 dark:text-gray-400">
            {props.projectInfo.membersCnt}명 참여중
          </span>
        </Link>
      </div>

      <div className="h-full p-2 cursor-pointer" onClick={handleClickStar}>
        <FaStar className="text-yellow-400" />
      </div>
    </div>
  )
}
