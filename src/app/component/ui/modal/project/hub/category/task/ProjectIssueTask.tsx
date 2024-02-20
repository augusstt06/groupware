'use client'

import { type ChangeEvent, useEffect, useRef, useState } from 'react'

import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

import { DialogCalendar } from '../../../../dialog/Dialog'
import {
  IssueCalendar,
  IssueDescription,
  IssueFile,
  IssueInput,
  IssueProgress,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import {
  PROJECT_DATE_FORMAT,
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_COLOR,
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_HOVER_COLOR,
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_VALUE,
  PROJECT_ISSUE_TASK_PROGRESS_INIT_COLOR,
  PROJECT_ISSUE_TASK_PROGRESS_INIT_HOVER_COLOR,
  PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_INIT_VALUE,
  PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_COLOR,
  PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_HOVER_COLOR,
  PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_VALUE,
  PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_COLOR,
  PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_HOVER_COLOR,
  PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE,
  PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_VALUE,
  PROJECT_ISSUE_TASK_VALUE,
} from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import {
  changeIssueCategoryReducer,
  changeIssueDescriptionReducer,
  changeIssueEndAtReducer,
  changeIssueProcessStateReducer,
  changeIssueStartAtReducer,
  changeIssueTitleReducer,
  resetIssueReducer,
} from '@/app/store/reducers/project/projectIssueReducer'
import { type CalendarValue, type ValuePiece } from '@/app/types/pageType'
import { type TaskListType } from '@/app/types/variable'

export default function ProjectIssueTask() {
  const startDialogRef = useRef<HTMLDialogElement | null>(null)
  const endDialogRef = useRef<HTMLDialogElement | null>(null)
  const dispatch = useAppDispatch()
  const taskTitleInput = useInput('')
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIssueTitleReducer(e.target.value))
    taskTitleInput.onChange(e)
  }
  const taskDescriptionInput = useInput('')
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIssueDescriptionReducer(e.target.value))
    taskDescriptionInput.onChange(e)
  }
  const [progress, setProgress] = useState<string>('')
  const [startDate, setStartDate] = useState<CalendarValue>(new Date())
  const [endDate, setEndDate] = useState<CalendarValue>(new Date())
  const handleProgress = (status: string) => {
    setProgress(status)
    dispatch(changeIssueProcessStateReducer(status))
  }

  const setInitialDate = () => {
    const startStringDate = moment(startDate as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueStartAtReducer(startStringDate))
    const endStringDate = moment(endDate as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueEndAtReducer(endStringDate))
  }
  const progressStatusList = [
    {
      title: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE,
      color: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_COLOR,
      hoverColor: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_HOVER_COLOR,
      value: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_VALUE,
    },
    {
      title: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE,
      color: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_COLOR,
      hoverColor: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_HOVER_COLOR,
      value: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_VALUE,
    },
    {
      title: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE,
      color: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_COLOR,
      hoverColor: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_HOVER_COLOR,
      value: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_VALUE,
    },
    {
      title: PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE,
      color: PROJECT_ISSUE_TASK_PROGRESS_INIT_COLOR,
      hoverColor: PROJECT_ISSUE_TASK_PROGRESS_INIT_HOVER_COLOR,
      value: PROJECT_ISSUE_TASK_PROGRESS_INIT_VALUE,
    },
  ]
  const managerList = ['김충연', '김민규', '남아현', '오준석']

  const handleOpenStartCalendar = () => {
    startDialogRef.current?.showModal()
  }
  const handleOpenEndCalendar = () => {
    endDialogRef.current?.showModal()
  }

  const handleStartDate = (date: CalendarValue) => {
    const stringDate = moment(date as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueStartAtReducer(stringDate))
    setStartDate(date)
    startDialogRef.current?.close()
  }

  const handleEndDate = (date: CalendarValue) => {
    const stringDate = moment(date as ValuePiece).format(PROJECT_DATE_FORMAT)
    dispatch(changeIssueEndAtReducer(stringDate))
    setEndDate(date)
    endDialogRef.current?.close()
  }

  const calendarList: TaskListType[] = [
    {
      title: '시작일',
      openModal: handleOpenStartCalendar,
      dateValue: startDate,
      onDateChange: handleStartDate,
      dialog: startDialogRef,
    },
    {
      title: '종료일',
      openModal: handleOpenEndCalendar,
      dateValue: endDate,
      onDateChange: handleEndDate,
      dialog: endDialogRef,
    },
  ]

  useEffect(() => {
    dispatch(resetIssueReducer())
    setInitialDate()
    dispatch(changeIssueCategoryReducer(PROJECT_ISSUE_TASK_VALUE.toUpperCase()))
  }, [])

  return (
    <>
      <div className="mt-2 p-2 mb-2">
        <span className="font-bold">업무 생성하기</span>
      </div>
      <div>
        <IssueInput
          title="제목"
          placeholder="제목을 입력해 주세요."
          value={taskTitleInput.value}
          onChange={handleChangeTitle}
        />
        <IssueProgress
          progressStatusList={progressStatusList}
          handleProgress={handleProgress}
          progress={progress}
        />
        <IssueSelect selectList={managerList} title="담당자" />
        {calendarList.map((data) => (
          <div key={data.title}>
            <IssueCalendar
              title={data.title}
              openModal={data.openModal}
              dateValue={data.dateValue}
              onDateChange={data.onDateChange}
            />
            <DialogCalendar dialog={data.dialog} calendarData={data} isWithtime={false} />
          </div>
        ))}
        <IssueFile />
        <IssueDescription value={taskDescriptionInput.value} onChange={handleChangeDescription} />
      </div>
    </>
  )
}
