import { useEffect, useState } from 'react'

import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useParams, useRouter } from 'next/navigation'

import {
  API_SUCCESS_CODE,
  GOOGLE_CALENDAR_API_KEY,
  GOOGLE_CALENDAR_ID,
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_SIDEBAR_SCHEDULE_ALL,
} from '@/app/constant/constant'
import { API_URL_PROJECT_ISSUE_LIST } from '@/app/constant/route/api-route-constant'
import { ROUTE_PROJECT } from '@/app/constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
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
  type ScheduleType,
} from '@/app/types/variableTypes'

export default function ProjectDetailSchedule() {
  const router = useRouter()
  const query = useParams()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const dispatch = useAppDispatch()
  const [scheduleEvent, setScheduleEvent] = useState<FullCalendarEventType[]>([])

  const randomColor = () => {
    const colors = ['rgb(254,247,208)', 'rgb(212,246,228)', 'rgb(210,236,253)', 'rgb(247,225,223)']
    const randomIndex = Math.floor(Math.random() * colors.length)
    switch (colors[randomIndex]) {
      case 'rgb(254,247,208)':
        return {
          bg: 'rgb(254,247,208)',
          text: 'rgb(248,216,73)',
        }
      case 'rgb(212,246,228)':
        return {
          bg: 'rgb(212,246,228)',
          text: 'rgb(98,214,124)',
        }
      case 'rgb(210,236,253)':
        return {
          bg: 'rgb(210,236,253)',
          text: 'rgb(72, 160, 248)',
        }
      default:
        return {
          bg: 'rgb(247,225,223)',
          text: 'rgb(221, 109,96)',
        }
    }
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

    const res = await moduleGetFetch<IssueResponseType<ScheduleType>>(fetchProps)
    if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
    const resList = (res as SuccessResponseType<IssueResponseType<ScheduleType>>).result.data
    resList.forEach((data) => {
      const scheduleEventProps: FullCalendarEventType = {
        issueId: data.id,
        title: data.title,
        start: data.startAt,
        end: data.endAt,
        backgroundColor: randomColor().bg,
        textColor: randomColor().text,
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
    <div className="w-full justify-center dark:border-gray-700 border border-gray-200 rounded-lg dark:bg-[#1a202c] shadow-lg p-3 z-1">
      <FullCalendar
        timeZone="UTC"
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin]}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={scheduleEvent}
        eventSources={[
          {
            googleCalendarId: GOOGLE_CALENDAR_ID,
            backgroundColor: 'rgb(221, 109,96)',
            color: 'white',
          },
        ]}
        googleCalendarApiKey={GOOGLE_CALENDAR_API_KEY}
        eventClick={(info) => {
          // FIXME: 클릭 이벤트는 preventDefault()로 막아두었음
          router.push(`${ROUTE_PROJECT}/schedule/${info.event._def.extendedProps.issueId}`)
          info.jsEvent.preventDefault()
        }}
      />
    </div>
  )
}
