'use client'

import { type ChangeEvent, useEffect, useState } from 'react'

import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

import {
  IssueCalendar,
  IssueDescription,
  IssueFile,
  IssueInput,
  IssueProgress,
  IssueSelect,
} from '../components/ProjectIssueComponent'

import {
  _PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_HOVER_COLOR,
  PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_COLOR,
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
import { type CalendarValue, type ValuePiece } from '@/app/types/pageTypes'

export default function ProjectTaskIssue() {
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
      hoverColor: _PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_HOVER_COLOR,
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
    const stringDate = moment(startDate as ValuePiece).format('YYYY-MM-DD')
    dispatch(changeIssueStartAtReducer(stringDate))
    setIsStartCalendarOpen(false)
  }

  const handleEndDate = (date: CalendarValue) => {
    setEndDate(date)
    const stringDate = moment(startDate as ValuePiece).format('YYYY-MM-DD')
    dispatch(changeIssueEndAtReducer(stringDate))
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
  useEffect(() => {
    dispatch(resetIssueReducer())
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
        <IssueDescription value={taskDescriptionInput.value} onChange={handleChangeDescription} />
      </div>
    </>
  )
}
