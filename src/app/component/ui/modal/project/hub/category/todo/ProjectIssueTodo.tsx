'use client'

import { type ChangeEvent, useEffect, useRef, useState } from 'react'

import moment from 'moment'

import { DialogCalendar } from '../../../../dialog/Dialog'
import {
  IssueCalendar,
  IssueDescription,
  IssueInput,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import {
  PROJECT_DATE_FORMAT,
  PROJECT_DETAIL_CATEGORY_TODO,
  PROJECT_ISSUE_TODO_VALUE,
} from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  changeIssueCategoryReducer,
  changeIssueDescriptionReducer,
  changeIssueEndAtReducer,
  changeIssueTitleReducer,
  resetIssueReducer,
} from '@/app/store/reducers/project/projectIssueReducer'
import { type CalendarValue, type ValuePiece } from '@/app/types/pageTypes'
import { type TaskListType } from '@/app/types/variableTypes'

export default function ProjectIssueTodo() {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
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

  const handleOpenCalendar = () => {
    dialogRef.current?.showModal()
  }
  const handleEndDate = (date: CalendarValue) => {
    setEndDate(date)
    const stringDate = moment(endDate as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueEndAtReducer(stringDate))
    dialogRef.current?.close()
  }
  const setInitialDate = () => {
    const stringDate = moment(endDate as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueEndAtReducer(stringDate))
  }
  useEffect(() => {
    dispatch(resetIssueReducer())
    setInitialDate()
    dispatch(changeIssueCategoryReducer(PROJECT_ISSUE_TODO_VALUE.toUpperCase()))
  }, [])
  const calendarData: TaskListType = {
    title: PROJECT_DETAIL_CATEGORY_TODO,
    openModal: handleOpenCalendar,
    dateValue: endDate,
    onDateChange: handleEndDate,
    dialog: dialogRef,
  }
  return (
    <>
      <div className="mt-2 p-2 mb-2">
        <span className="font-bold">할일 생성하기</span>
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
          openModal={handleOpenCalendar}
          dateValue={endDate}
          onDateChange={handleEndDate}
        />
        <IssueDescription value={todoDescriptionInput.value} onChange={handleChangeDescription} />
      </div>
      <DialogCalendar dialog={dialogRef} calendarData={calendarData} isWithtime={false} />
    </>
  )
}
