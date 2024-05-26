import { useEffect, useRef, useState } from 'react'

import moment from 'moment'
import { BsAlignEnd, BsAlignStart } from 'react-icons/bs'
import { FiPaperclip } from 'react-icons/fi'
import { IoPersonOutline } from 'react-icons/io5'
import { LuLoader } from 'react-icons/lu'

import { IssueCalendar } from '../../../modal/issues/category/components/ProjectIssueComponent'

import { DialogCalendar } from '@/_components/modal/dialog/Dialog'
import {
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
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
} from '@/_constant/constant'
import { API_URL_PROJECT_ISSUE } from '@/_constant/route/api-route-constant'
import { useAppSelector } from '@/_module/hooks/reduxHooks'
import { moduleGetCookie } from '@/_module/utils/moduleCookie'
import { modulePatchFetch } from '@/_module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/_types/module'
import {
  type CalendarValue,
  type ProjectIssueDetailProps,
  type ValuePiece,
} from '@/_types/pageType'

export default function ProjectTaskDetail(props: ProjectIssueDetailProps) {
  const { issue } = props
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const startDialogRef = useRef<HTMLDialogElement | null>(null)
  const endDialogRef = useRef<HTMLDialogElement | null>(null)
  const handleOpenStartCalendar = () => {
    startDialogRef.current?.showModal()
  }
  const handleOpenEndCalendar = () => {
    endDialogRef.current?.showModal()
  }
  const [process, setProcess] = useState(issue?.processState)
  const handleProcessState = (newProcess: string) => {
    setProcess(newProcess)
  }

  const [startDate, setStartDate] = useState<CalendarValue>(new Date(issue?.startAt as string))
  const [endDate, setEndDate] = useState<CalendarValue>(new Date(issue?.endAt as string))
  const handleStartDate = (date: CalendarValue) => {
    setStartDate(date)
    startDialogRef.current?.close()
  }

  const handleEndDate = (date: CalendarValue) => {
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
  const issueStateClassName = (issueValue: string, bgColor: string, hoverColor: string) => {
    if (process === issueValue) {
      return `cursor-pointer mr-3 text-white ${bgColor} smooth-transition w-1/5 p-2 rounded-full text-center`
    }
    return `cursor-pointer mr-3 bg-gray-200 ${hoverColor}dark:bg-gray-400 hover:text-white  smooth-transition w-1/5 p-2 rounded-full text-center`
  }

  const calendarList = [
    {
      icon: <BsAlignStart className="hidden w-5 h-5 mr-5 lg:inline" />,
      title: '시작일',
      openModal: handleOpenStartCalendar,
      dateValue: startDate,
      onDateChange: handleStartDate,
      dialog: startDialogRef,
    },
    {
      icon: <BsAlignEnd className="hidden w-5 h-5 mr-5 lg:inline" />,
      title: '종료일',
      openModal: handleOpenEndCalendar,
      dateValue: endDate,
      onDateChange: handleEndDate,
      dialog: endDialogRef,
    },
  ]

  const convertDate = (date: string) => {
    return new Date(`${date}T00:00:00Z`).toISOString()
  }
  const fetchPatchTaskIssue = async () => {
    const fetchProps: ModulePostFetchProps = {
      data: {
        category: PROJECT_ISSUE_TASK_VALUE.toUpperCase(),
        // FIXME: issue response에 description 필요함
        description: '',
        endAt: convertDate(moment(endDate as ValuePiece).format(PROJECT_DATE_FORMAT)),
        startAt: convertDate(moment(startDate as ValuePiece).format(PROJECT_DATE_FORMAT)),
        issueId: issue?.id,
        processState: process,
        title: issue?.title,
      },
      fetchUrl: API_URL_PROJECT_ISSUE,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    }
    await modulePatchFetch<string>(fetchProps)
  }
  useEffect(() => {
    void fetchPatchTaskIssue()
  }, [process, startDate, endDate])

  return (
    <>
      {/* processState */}
      <div className="flex flex-col items-start mt-5">
        <div className="flex flex-row items-center justify-start w-full">
          <LuLoader className="hidden w-5 h-5 mr-5 lg:inline" />
          {issueState.map((data) => (
            <div
              key={data.title}
              className={issueStateClassName(data.value, data.bgColor, data.hoverColor)}
              onClick={() => {
                handleProcessState(data.value)
              }}
            >
              {data.title}
            </div>
          ))}
        </div>
      </div>
      {/*  */}
      {/* issuer */}
      <div className="flex flex-col items-start mt-5">
        <div className="flex flex-row items-center justify-start w-full">
          <IoPersonOutline className="w-5 h-5 mr-5" />
          {/* FIXME: 추후 프로필 사진 추가 */}
          <div className="p-2 ">{issue?.issuer.name}</div>
        </div>
      </div>
      {/*  */}

      {/* schedule */}
      <div className="flex flex-col items-start mt-5">
        {calendarList.map((data) => (
          <div
            className="flex flex-row items-center justify-start w-full truncate"
            key={data.title}
          >
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
