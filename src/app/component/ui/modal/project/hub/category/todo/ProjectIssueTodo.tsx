'use client'

import { type ChangeEvent, useEffect, useState } from 'react'

import {
  IssueCalendar,
  IssueDescription,
  IssueInput,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import { PROJECT_ISSUE_TODO_VALUE } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  changeIssueCategoryReducer,
  changeIssueDescriptionReducer,
  changeIssueTitleReducer,
  resetIssueReducer,
} from '@/app/store/reducers/project/projectIssueReducer'
import { type CalendarValue } from '@/app/types/pageTypes'

export default function ProjectIssueTodo() {
  const dispatch = useAppDispatch()
  const todoTitleInput = useInput('')
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIssueTitleReducer(e.target.value))
    todoTitleInput.onChange(e)
  }
  const todoDescriptionInput = useInput('')
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIssueDescriptionReducer(e.target.value))
    todoDescriptionInput.onChange(e)
  }
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
  useEffect(() => {
    dispatch(resetIssueReducer())
    dispatch(changeIssueCategoryReducer(PROJECT_ISSUE_TODO_VALUE.toUpperCase()))
  }, [])
  return (
    <>
      <div className="mt-2 p-2 mb-2">
        <span className="font-bold">워딩</span>
      </div>
      <div>
        <IssueInput
          title="제목"
          placeholder="제목을 입력해 주세요"
          value={todoTitleInput.value}
          onChange={handleChangeTitle}
        />
        <IssueSelect title="담당자" selectList={managerList} />
        <IssueCalendar
          title="마감일"
          state={isCalendarOpen}
          openModal={handleOpenCalendar}
          dateValue={endDate}
          onDateChange={handleEndDate}
        />
        <IssueDescription value={todoDescriptionInput.value} onChange={handleChangeDescription} />
      </div>
    </>
  )
}
