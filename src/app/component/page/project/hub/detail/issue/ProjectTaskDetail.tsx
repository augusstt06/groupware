import { useRef, useState } from 'react'

import { BsAlignEnd, BsAlignStart } from 'react-icons/bs'
import { FiPaperclip } from 'react-icons/fi'
import { IoPersonOutline } from 'react-icons/io5'
import { LuLoader } from 'react-icons/lu'

import { DialogCalendar } from '@/app/component/ui/modal/dialog/Dialog'
import { IssueCalendar } from '@/app/component/ui/modal/project/hub/category/components/ProjectIssueComponent'
import {
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
} from '@/app/constant/constant'
import { type CalendarValue, type ProjectIssueDetailProps } from '@/app/types/pageTypes'

export default function ProjectTaskDetail(props: ProjectIssueDetailProps) {
  const { issue } = props
  const startDialogRef = useRef<HTMLDialogElement | null>(null)
  const endDialogRef = useRef<HTMLDialogElement | null>(null)
  const handleOpenStartCalendar = () => {
    startDialogRef.current?.showModal()
  }
  const handleOpenEndCalendar = () => {
    endDialogRef.current?.showModal()
  }
  const [startDate, setStartDate] = useState<CalendarValue>(new Date(issue?.startAt as string))
  const [endDate, setEndDate] = useState<CalendarValue>(new Date(issue?.endAt as string))
  const handleStartDate = (date: CalendarValue) => {
    // const stringDate = moment(date as ValuePiece).format(PROJECT_DATE_FORMAT)
    setStartDate(date)
    startDialogRef.current?.close()
  }

  const handleEndDate = (date: CalendarValue) => {
    // const stringDate = moment(date as ValuePiece).format(PROJECT_DATE_FORMAT)
    setEndDate(date)
    endDialogRef.current?.close()
  }
  const issueState = [
    {
      title: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_TITLE,
      value: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_VALUE,
      bgColor: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_COLOR,
      hoverColor: PROJECT_ISSUE_TASK_PROGRESS_REQUESTED_HOVER_COLOR,
    },
    {
      title: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_TITLE,
      value: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_VALUE,
      bgColor: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_COLOR,
      hoverColor: PROJECT_ISSUE_TASK_PROGRESS_PROCESSING_HOVER_COLOR,
    },
    {
      title: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_TITLE,
      value: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_VALUE,
      bgColor: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_COLOR,
      hoverColor: PROJECT_ISSUE_TASK_PROGRESS_COMPLETED_HOVER_COLOR,
    },
    {
      title: PROJECT_ISSUE_TASK_PROGRESS_INIT_TITLE,
      value: PROJECT_ISSUE_TASK_PROGRESS_INIT_VALUE,
      bgColor: PROJECT_ISSUE_TASK_PROGRESS_INIT_COLOR,
      hoverColor: PROJECT_ISSUE_TASK_PROGRESS_INIT_HOVER_COLOR,
    },
  ]
  const issueStateClassName = (
    issueValue: string,
    bgColor: string,
    hoverColor: string,
    processState: string,
  ) => {
    if (issueValue === processState) {
      return `cursor-pointer mr-3 text-white ${bgColor} transition ease-in-out duration-300 w-1/5 p-2 rounded-full text-center`
    }
    return `cursor-pointer mr-3 bg-gray-200 ${hoverColor}dark:bg-gray-400 hover:text-white  transition ease-in-out duration-300 w-1/5 p-2 rounded-full text-center`
  }

  const calendarList = [
    {
      icon: <BsAlignStart className="w-5 h-5 mr-5" />,
      title: '시작일',
      openModal: handleOpenStartCalendar,
      dateValue: startDate,
      onDateChange: handleStartDate,
      dialog: startDialogRef,
    },
    {
      icon: <BsAlignEnd className="w-5 h-5 mr-5" />,
      title: '종료일',
      openModal: handleOpenEndCalendar,
      dateValue: endDate,
      onDateChange: handleEndDate,
      dialog: endDialogRef,
    },
  ]
  return (
    <>
      {/* processState */}
      <div className="flex flex-col items-start mt-5">
        <div className="flex flex-row items-center justify-start w-2/3">
          <LuLoader className="w-5 h-5 mr-5" />
          {issueState.map((data) => (
            <div
              key={data.title}
              className={issueStateClassName(
                data.value,
                data.bgColor,
                data.hoverColor,
                issue?.processState as string,
              )}
            >
              {data.title}
            </div>
          ))}
        </div>
      </div>
      {/*  */}
      {/* issuer */}
      <div className="flex flex-col items-start mt-5">
        <div className="flex flex-row items-center justify-start w-2/3">
          <IoPersonOutline className="w-5 h-5 mr-5" />
          {/* FIXME: 추후 프로필 사진 추가 */}
          <div className="w-1/5 p-2 ">{issue?.issuer.name}</div>
        </div>
      </div>
      {/*  */}

      {/* schedule */}
      <div className="flex flex-col items-start mt-5">
        {calendarList.map((data) => (
          <div className="flex flex-row items-center justify-start w-2/3" key={data.title}>
            {data.icon}
            <div className="w-full">
              <IssueCalendar
                title=""
                openModal={data.openModal}
                dateValue={data.dateValue}
                onDateChange={data.onDateChange}
              />
              <DialogCalendar dialog={data.dialog} calendarData={data} isWithtime={false} />
            </div>
          </div>
        ))}
      </div>
      {/*  */}
      <div className="flex flex-col items-start mt-5">
        <FiPaperclip className="w-5 h-5 mr-5" />
      </div>
    </>
  )
}
