'use client'

import { useState } from 'react'

import 'react-calendar/dist/Calendar.css'
import {
  TaskCalendar,
  TaskComment,
  TaskFile,
  TaskInput,
  TaskProgress,
  TaskSelectManager,
} from './task/ProjectIssueTasks'

export default function CreateProjectTaskIssue() {
  const progressStatusList = [
    { title: '요청', color: 'hover:bg-[rgb(248,216,73)] dark:hover:bg-[rgb(248,216,73)]' },
    { title: '진행', color: 'hover:bg-[rgb(98,214,124)] dark:hover:bg-[rgb(98,214,124)]' },
    { title: '완료', color: 'hover:bg-[rgb(72,162,248)] dark:hover:bg-[rgb(72,162,248)]' },
    { title: '보류', color: 'hover:bg-[rgb(221,109,96)] dark:hover:bg-[rgb(221,109,96)]' },
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

  const calendarList = [
    { title: '시작일', state: isStartCalendarOpen, onClick: handleOpenStartCalendar },
    { title: '종료일', state: isEndCaledarOpen, onClick: handleOpenEndCalendar },
  ]
  return (
    <>
      <div className="mt-2 p-2 mb-2">
        <span className="font-bold">업무 생성하기</span>
      </div>
      <div>
        <TaskInput />
        <TaskProgress progressStatusList={progressStatusList} />
        <TaskSelectManager managerList={managerList} />
        {calendarList.map((data) => (
          <TaskCalendar
            key={data.title}
            title={data.title}
            state={data.state}
            onClick={data.onClick}
          />
        ))}
        <TaskFile />
        <TaskComment />
      </div>
    </>
  )
}
