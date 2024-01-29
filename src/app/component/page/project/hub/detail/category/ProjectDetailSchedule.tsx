import { useEffect, useState } from 'react'

import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useParams } from 'next/navigation'

import {
  API_SUCCESS_CODE,
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_SIDEBAR_SCHEDULE_ALL,
} from '@/app/constant/constant'
import { API_URL_PROJECT_ISSUE_LIST } from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import {
  changeProjectDetailCategoryReducer,
  changeProjectDetailScheduleCategoryReducer,
} from '@/app/store/reducers/project/projectDetailCategoryReducer'
import {
  type FailResponseType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import {
  type FullCalendarEventType,
  type IssueResponseType,
  type SchduleType,
} from '@/app/types/variableTypes'

export default function ProjectDetailSchedule() {
  const query = useParams()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const dispatch = useAppDispatch()
  const [scheduleEvent, setScheduleEvent] = useState<FullCalendarEventType[]>([])

  const randomColor = () => {
    const colors = [
      'rgb(240,185,185)',
      'rgb(228,177,227)',
      'rgb(170,230,200)',
      'rgb(170,220,240)',
      'rgb(207,183,242)',
      'rgb(240,210,190)',
    ]
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }
  // title 말고 다른 것으로 구분할지 생각
  const isDataInList = (list: FullCalendarEventType[], newData: FullCalendarEventType) => {
    return list.some((item) => item.title === newData.title)
  }
  const fetchScheduleList = async () => {
    const fetchProps: ModuleGetFetchProps = {
      params: {
        category: PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase(),
        limit: 10,
        offset: 0,
        projectId: Number(query.id),
      },
      fetchUrl: API_URL_PROJECT_ISSUE_LIST,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    const res = await moduleGetFetch<IssueResponseType<SchduleType>>(fetchProps)
    if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
    const resList = (res as SuccessResponseType<IssueResponseType<SchduleType>>).result.data
    resList.forEach((data) => {
      const scheduleEventProps: FullCalendarEventType = {
        title: data.title,
        start: moduleConvertDate(data.startAt, '-', false),
        end: moduleConvertDate(data.endAt, '-', false),
        backgroundColor: randomColor(),
      }
      if (!isDataInList(scheduleEvent, scheduleEventProps)) {
        setScheduleEvent((prev) => [...prev, scheduleEventProps])
      }
    })
  }
  useEffect(() => {
    dispatch(changeProjectDetailCategoryReducer(PROJECT_DETAIL_CATEGORY_SCHEDULE))
    dispatch(changeProjectDetailScheduleCategoryReducer(PROJECT_SIDEBAR_SCHEDULE_ALL))
    void fetchScheduleList()
  }, [])

  return (
    <div className=" w-full justify-center dark:border-gray-700 border border-gray-200 rounded-lg dark:bg-[#1a202c] shadow-lg p-3 z-1">
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={scheduleEvent}
      />
    </div>
  )
}
