import { type ChangeEvent, useRef, useState } from 'react'

import moment from 'moment'
import { BsAlignEnd, BsAlignStart } from 'react-icons/bs'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { IoLocationOutline, IoPersonOutline } from 'react-icons/io5'

import { DialogCalendar } from '@/app/component/ui/modal/dialog/Dialog'
import { IssueTime } from '@/app/component/ui/modal/project/hub/category/components/ProjectIssueComponent'
import {
  PROJECT_ISSUE_SCEDULE_END,
  PROJECT_ISSUE_SCEDULE_START,
  PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN,
  PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO,
  PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN,
  PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO,
} from '@/app/constant/constant'
import {
  type CalendarValue,
  type IssueCalendarWithTimeProps,
  type ProjectIssueDetailProps,
  type ValuePiece,
} from '@/app/types/pageTypes'
import { type ScheduleListType } from '@/app/types/variableTypes'

export default function ProjectScheduleDeatil(props: ProjectIssueDetailProps) {
  const { issue } = props
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const startDialogRef = useRef<HTMLDialogElement | null>(null)
  const endDialogRef = useRef<HTMLDialogElement | null>(null)
  const [startDate, setStartDate] = useState<CalendarValue>(new Date(issue?.startAt as string))
  const [endDate, setEndDate] = useState<CalendarValue>(new Date(issue?.endAt as string))

  const [selectTime, setSelectTime] = useState({
    start: { hour: '00', minute: '00' },
    end: { hour: '00', minute: '00' },
  })

  const handleSelectTimes = (type: 'start' | 'end', unit: 'hour' | 'minute', value: string) => {
    setSelectTime((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [unit]: value,
      },
    }))
  }

  const hourList = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, '0')
    return hour
  })
  const [isAllday, setIsAllDay] = useState<boolean>(false)
  const handleChangeAllday = () => {
    setIsAllDay(!isAllday)
  }

  const handleOpenStartCalendar = () => {
    startDialogRef.current?.showModal()
  }
  const handleOpenEndCalendar = () => {
    endDialogRef.current?.showModal()
  }

  const handleStartDate = (date: CalendarValue) => {
    if (moment(endDate as ValuePiece).isBefore(date as ValuePiece)) {
      dialogRef.current?.showModal()
      return
    }

    setStartDate(date)
    startDialogRef.current?.close()
  }

  const handleEndDate = (date: CalendarValue) => {
    if (moment(startDate as ValuePiece).isAfter(date as ValuePiece)) {
      dialogRef.current?.showModal()
      return
    }

    setEndDate(date)
    endDialogRef.current?.close()
  }

  const scheduleList: ScheduleListType[] = [
    {
      keyValue: 'start',
      title: <BsAlignStart className="w-5 h-5 mr-5" />,
      timeCategory: PROJECT_ISSUE_SCEDULE_START,
      openCalendar: handleOpenStartCalendar,
      calendarDateValue: startDate,
      onDateChange: handleStartDate,
      hoursList: hourList,
      handleSelectTime: handleSelectTimes,
      viewCheckAllDay: true,
      isCheckAllday: isAllday,
      handleAllday: handleChangeAllday,
      timeState: selectTime.start,
      dialog: startDialogRef,
    },
    {
      keyValue: 'end',
      title: <BsAlignEnd className="w-5 h-5 mr-5" />,
      timeCategory: PROJECT_ISSUE_SCEDULE_END,
      openCalendar: handleOpenEndCalendar,
      calendarDateValue: endDate,
      onDateChange: handleEndDate,
      hoursList: hourList,
      handleSelectTime: handleSelectTimes,
      viewCheckAllDay: false,
      handleAllday: handleChangeAllday,
      timeState: selectTime.end,
      isCheckAllday: isAllday,
      dialog: endDialogRef,
    },
  ]
  return (
    <>
      <div className="flex flex-col items-start mt-5">
        <div className="flex flex-row items-center justify-start w-2/3">
          <IoPersonOutline className="w-5 h-5 mr-5" />
          {/* FIXME: 추후 프로필 사진 추가 */}
          <div className="w-16 p-2">{issue?.issuer.name}</div>
        </div>
      </div>
      <div className="flex flex-col items-start mt-5">
        {scheduleList.map((data) => (
          <div className="flex flex-row items-center justify-start w-2/3" key={data.keyValue}>
            <DetailCalendarTime scheduleData={data} />
            <DialogCalendar dialog={data.dialog} calendarWithTimeData={data} isWithtime={false} />
          </div>
        ))}
        <div className="flex flex-col items-start mt-5">
          <IoLocationOutline className="w-5 h-5 mr-5" />
        </div>
      </div>
    </>
  )
}

export function DetailCalendarTime(props: IssueCalendarWithTimeProps) {
  const issueTimeList = [
    {
      viewCheckAllDate: props.scheduleData.viewCheckAllDay,
      timeState: props.scheduleData.timeState,
      hoursList: props.scheduleData.hoursList,
      unit: PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO,
      isCheckAllday: props.scheduleData.isCheckAllday,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => {
        props.scheduleData.handleSelectTime(
          props.scheduleData.timeCategory,
          PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN,
          e.target.value,
        )
      },
    },
    {
      viewCheckAllDate: props.scheduleData.viewCheckAllDay,
      timeState: props.scheduleData.timeState,
      hoursList: props.scheduleData.hoursList,
      unit: PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO,
      isCheckAllday: props.scheduleData.isCheckAllday,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => {
        props.scheduleData.handleSelectTime(
          props.scheduleData.timeCategory,
          PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN,
          e.target.value,
        )
      },
    },
  ]

  const renderTitle = () => {
    if (props.scheduleData.title === '') {
      return <></>
    }
    return (
      <div className="md:block hidden min-w-40 col-span-1">
        <span className="text-sm md:text-base">{props.scheduleData.title}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-row items-center w-100">
      {renderTitle()}
      <div className="w-24 lg:w-36 flex flex-col lg:flex-row items-center rounded mt-2 bg-gray-50 border text-gray-900 text-sm border-gray-300 p-2 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white truncate ">
        <FaRegCalendarAlt onClick={props.scheduleData.openCalendar} className="mb-2 lg:mb-0" />
        <span className="ml-2 lg:text-base text-xs">
          {moment(props.scheduleData.calendarDateValue as ValuePiece).format('YYYY/MM/DD')}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:w-44 w-24">
        {issueTimeList.map((data) => (
          <div key={data.unit} className="md:ml-3">
            <IssueTime
              viewCheckAllDay={data.viewCheckAllDate}
              timeState={data.timeState}
              hoursList={data.hoursList}
              unit={data.unit}
              onChange={data.onChange}
              isCheckAllday={data.isCheckAllday}
            />
          </div>
        ))}
      </div>
      {props.scheduleData.viewCheckAllDay ? (
        <div className="w-20 md:flex hidden items-center flex-row">
          <input type="checkbox" onClick={props.scheduleData.handleAllday} className="w-4 h-4" />
          <span className="text-sm ml-3">하루종일</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
