'use client'

import { type ChangeEvent, useEffect, useState } from 'react'

import {
  IssueCalendarWithTime,
  IssueDescription,
  IssueInput,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import { PROJECT_ISSUE_SCHEDULE_VALUE } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  changeIssueCategoryReducer,
  changeIssueDescriptionReducer,
  changeIssueTitleReducer,
  resetIssueReducer,
} from '@/app/store/reducers/project/projectIssueReducer'
import { type CalendarValue } from '@/app/types/pageTypes'

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
  const [selectTime, setSelectTime] = useState({ hour: '', minute: '' })
  const attendanceList = ['김충연', '김민규', '남아현', '오준석']
  const [startDate, setStartDate] = useState<CalendarValue>(new Date())
  const [endDate, setEndDate] = useState<CalendarValue>(new Date())

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

  const scheduleList = [
    {
      title: '시작일',
      state: isStartCalendarOpen,
      openModal: handleOpenStartCalendar,
      dateValue: startDate,
      onDateChange: handleStartDate,
    },
    {
      title: '마감일',
      state: isEndCaledarOpen,
      openModal: handleOpenEndCalendar,
      dateValue: endDate,
      onDateChange: handleEndDate,
    },
  ]

  const hours = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, '0')
    return hour
  })
  const handleSelectHour = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectTime({
      hour: e.target.value,
      minute: selectTime.minute,
    })
  }
  const handleSelectMinute = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectTime({
      hour: selectTime.hour,
      minute: e.target.value,
    })
  }
  useEffect(() => {
    dispatch(resetIssueReducer())
    dispatch(changeIssueCategoryReducer(PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase()))
  })
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
          <IssueCalendarWithTime
            key={data.title}
            title={data.title}
            state={data.state}
            openModal={data.openModal}
            hours={hours}
            handleSelectHour={handleSelectHour}
            handleSelectMinute={handleSelectMinute}
            dateValue={data.dateValue}
            onDateChange={data.onDateChange}
          />
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
