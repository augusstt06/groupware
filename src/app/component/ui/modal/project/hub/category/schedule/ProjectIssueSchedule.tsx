'use client'

import { type ChangeEvent, useEffect, useState } from 'react'

import {
  IssueCalendarWithTime,
  IssueDescription,
  IssueInput,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import {
  PROJECT_ISSUE_SCEDULE_END,
  PROJECT_ISSUE_SCEDULE_END_TITLE,
  PROJECT_ISSUE_SCEDULE_START,
  PROJECT_ISSUE_SCEDULE_START_TITLE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
} from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  changeIssueCategoryReducer,
  changeIssueDescriptionReducer,
  changeIssueTitleReducer,
} from '@/app/store/reducers/project/projectIssueReducer'
import { type CalendarValue } from '@/app/types/pageTypes'
import { type ScheduleListType } from '@/app/types/variableTypes'

export default function ProjectIssueSchedule() {
  const dispatch = useAppDispatch()
  const scheduleTitleInput = useInput('')
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIssueTitleReducer(e.target.value))
    scheduleTitleInput.onChange(e)
  }
  const schedulePlaceInput = useInput('')
  const handleChangePlace = (e: ChangeEvent<HTMLInputElement>) => {
    schedulePlaceInput.onChange(e)
  }
  const scheduleDescriptionInput = useInput('')
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIssueDescriptionReducer(e.target.value))
    scheduleDescriptionInput.onChange(e)
  }
  const [selectTime, setSelectTime] = useState({
    start: { hour: '00', minute: '00' },
    end: { hour: '00', minute: '00' },
  })
  const attendanceList = ['김충연', '김민규', '남아현', '오준석']
  const [startDate, setStartDate] = useState<CalendarValue>(new Date())
  const [endDate, setEndDate] = useState<CalendarValue>(new Date())
  const [isAllday, setIsAllDay] = useState<boolean>(false)
  const handleChangeAllday = () => {
    setIsAllDay(!isAllday)
  }

  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState<boolean>(false)
  const handleOpenStartCalendar = () => {
    setIsStartCalendarOpen(!isStartCalendarOpen)
  }
  const [isEndCaledarOpen, setIsEndCalendarOpen] = useState<boolean>(false)
  const handleOpenEndCalendar = () => {
    setIsEndCalendarOpen(!isEndCaledarOpen)
  }
  const handleStartDate = (date: CalendarValue) => {
    setStartDate(date)
    setIsStartCalendarOpen(false)
  }

  const handleEndDate = (date: CalendarValue) => {
    setEndDate(date)
    setIsEndCalendarOpen(false)
  }

  const hourList = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, '0')
    return hour
  })

  const handleSelectTimes = (type: 'start' | 'end', unit: 'hour' | 'minute', value: string) => {
    setSelectTime((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [unit]: value,
      },
    }))
  }
  const scheduleList: ScheduleListType[] = [
    {
      title: PROJECT_ISSUE_SCEDULE_START_TITLE,
      timeCategory: PROJECT_ISSUE_SCEDULE_START,
      isCalendarOpen: isStartCalendarOpen,
      openCalendar: handleOpenStartCalendar,
      calendarDateValue: startDate,
      onDateChange: handleStartDate,
      hoursList: hourList,
      handleSelectTime: handleSelectTimes,
      viewCheckAllDay: true,
      isCheckAllday: isAllday,
      handleAllday: handleChangeAllday,
      timeState: selectTime.start,
    },
    {
      title: PROJECT_ISSUE_SCEDULE_END_TITLE,
      timeCategory: PROJECT_ISSUE_SCEDULE_END,
      isCalendarOpen: isEndCaledarOpen,
      openCalendar: handleOpenEndCalendar,
      calendarDateValue: endDate,
      onDateChange: handleEndDate,
      hoursList: hourList,
      handleSelectTime: handleSelectTimes,
      viewCheckAllDay: false,
      handleAllday: handleChangeAllday,
      timeState: selectTime.end,
      isCheckAllday: isAllday,
    },
  ]
  useEffect(() => {
    if (isAllday) {
      setEndDate(startDate)
      setSelectTime({
        start: { hour: '00', minute: '00' },
        end: { hour: '23', minute: '59' },
      })
    }
    dispatch(changeIssueCategoryReducer(PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase()))
  }, [isAllday])

  return (
    <>
      <div className="mt-2 p-2 mb-2">
        <span className="font-bold">일정 생성하기</span>
      </div>
      <div>
        <IssueInput
          title="제목"
          placeholder="제목을 입력해 주세요."
          value={scheduleTitleInput.value}
          onChange={handleChangeTitle}
        />
        <IssueSelect title="참석자" selectList={attendanceList} />
        {scheduleList.map((data) => (
          <IssueCalendarWithTime key={data.title} scheduleData={data} />
        ))}
        <IssueInput
          title="장소"
          placeholder="장소를 입력해 주세요."
          value={schedulePlaceInput.value}
          onChange={handleChangePlace}
        />
        <IssueDescription
          value={scheduleDescriptionInput.value}
          onChange={handleChangeDescription}
        />
      </div>
    </>
  )
}
