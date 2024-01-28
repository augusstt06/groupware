import { useEffect } from 'react'

import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

import {
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_SIDEBAR_SCHEDULE_ALL,
} from '@/app/constant/constant'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  changeProjectDetailCategoryReducer,
  changeProjectDetailScheduleCategoryReducer,
} from '@/app/store/reducers/project/projectDetailCategoryReducer'

export default function ProjectDetailSchedule() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeProjectDetailCategoryReducer(PROJECT_DETAIL_CATEGORY_SCHEDULE))
    dispatch(changeProjectDetailScheduleCategoryReducer(PROJECT_SIDEBAR_SCHEDULE_ALL))
  })
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
      />
    </div>
  )
}
