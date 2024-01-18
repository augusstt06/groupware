'use client'

import { type ChangeEvent, useState } from 'react'

import {
  IssueCalendarWithTime,
  IssueComment,
  IssueInput,
  IssueSelect,
} from '../components/ProjectIssueComponent'

export default function ProjectIssueCalendar() {
  const [selectTime, setSelectTime] = useState({ hour: '', minute: '' })
  const attendanceList = ['김충연', '김민규', '남아현', '오준석']
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState<boolean>(false)
  const handleOpenStartCalendar = () => {
    setIsStartCalendarOpen(!isStartCalendarOpen)
  }
  const [isEndCaledarOpen, setIsEndCalendarOpen] = useState<boolean>(false)
  const handleOpenEndCalendar = () => {
    setIsEndCalendarOpen(!isEndCaledarOpen)
  }

  const calendarList = [
    { title: '시작일', state: isStartCalendarOpen, openModal: handleOpenStartCalendar },
    { title: '마감일', state: isEndCaledarOpen, openModal: handleOpenEndCalendar },
  ]

  const hours = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, '0') // 0시부터 9시까지는 앞에 0을 붙임
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

  return (
    <>
      <div className="mt-2 p-2 mb-2">
        <span className="font-bold">일정 생성하기</span>
      </div>
      <div>
        <IssueInput title="제목" placeholder="제목을 입력해 주세요." />
        <IssueSelect title="참석자" selectList={attendanceList} />
        {calendarList.map((data) => (
          <IssueCalendarWithTime
            key={data.title}
            title={data.title}
            state={data.state}
            openModal={data.openModal}
            hours={hours}
            handleSelectHour={handleSelectHour}
            handleSelectMinute={handleSelectMinute}
          />
        ))}
        <IssueInput title="장소" placeholder="장소를 입력해 주세요." />
        <IssueComment />
      </div>
    </>
  )
}
