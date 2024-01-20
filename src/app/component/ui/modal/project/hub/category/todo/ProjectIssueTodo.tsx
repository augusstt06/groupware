'use client'

import { useState } from 'react'

import {
  IssueCalendar,
  IssueComment,
  IssueInput,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import { type CalendarValue } from '@/app/types/pageTypes'

export default function ProjectIssueTodo() {
  const managerList = ['김충연', '김민규', '남아현', '오준석']
  const [endDate, setEndDate] = useState<CalendarValue>(new Date())

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const handleOpenCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen)
  }
  const handleEndDate = (date: CalendarValue) => {
    setEndDate(date)
    setIsCalendarOpen(false)
  }
  return (
    <>
      <div className="mt-2 p-2 mb-2">
        <span className="font-bold">워딩</span>
      </div>
      <div>
        <IssueInput title="제목" placeholder="제목을 입력해 주세요" />
        <IssueSelect title="담당자" selectList={managerList} />
        <IssueCalendar
          title="마감일"
          state={isCalendarOpen}
          openModal={handleOpenCalendar}
          dateValue={endDate}
          onDateChange={handleEndDate}
        />
        <IssueComment />
      </div>
    </>
  )
}
