'use client'

import { useState } from 'react'

import 'react-calendar/dist/Calendar.css'
import {
  IssueCalendar,
  IssueComment,
  IssueFile,
  IssueInput,
  IssueProgress,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import { type CalendarValue } from '@/app/types/pageTypes'

export default function ProjectTaskIssue() {
  const [progress, setProgress] = useState<string>('')
  const [startDate, setStartDate] = useState<CalendarValue>(new Date())
  const [endDate, setEndDate] = useState<CalendarValue>(new Date())

  const handleProgress = (status: string) => {
    setProgress(status)
  }
  const progressStatusList = [
    {
      title: '요청',
      color: 'bg-[rgb(248,216,73)]',
      hoverColor: 'hover:bg-[rgb(248,216,73)] dark:hover:bg-[rgb(248,216,73)]',
    },
    {
      title: '진행',
      color: 'bg-[rgb(98,214,124)]',
      hoverColor: 'hover:bg-[rgb(98,214,124)] dark:hover:bg-[rgb(98,214,124)]',
    },
    {
      title: '완료',
      color: 'bg-[rgb(72,162,248)]',
      hoverColor: 'hover:bg-[rgb(72,162,248)] dark:hover:bg-[rgb(72,162,248)]',
    },
    {
      title: '보류',
      color: 'bg-[rgb(221,109,96)]',
      hoverColor: 'hover:bg-[rgb(221,109,96)] dark:hover:bg-[rgb(221,109,96)]',
    },
  ]
  const managerList = ['김충연', '김민규', '남아현', '오준석']
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

  const calendarList = [
    {
      title: '시작일',
      state: isStartCalendarOpen,
      openModal: handleOpenStartCalendar,
      dateValue: startDate,
      onDateChange: handleStartDate,
    },
    {
      title: '종료일',
      state: isEndCaledarOpen,
      openModal: handleOpenEndCalendar,
      dateValue: endDate,
      onDateChange: handleEndDate,
    },
  ]
  return (
    <>
      <div className="mt-2 p-2 mb-2">
        <span className="font-bold">업무 생성하기</span>
      </div>
      <div>
        <IssueInput title="제목" placeholder="제목을 입력해 주세요." />
        <IssueProgress
          progressStatusList={progressStatusList}
          handleProgress={handleProgress}
          progress={progress}
        />
        <IssueSelect selectList={managerList} title="담당자" />
        {calendarList.map((data) => (
          <IssueCalendar
            key={data.title}
            title={data.title}
            state={data.state}
            openModal={data.openModal}
            dateValue={data.dateValue}
            onDateChange={data.onDateChange}
          />
        ))}
        <IssueFile />
        <IssueComment />
      </div>
    </>
  )
}
