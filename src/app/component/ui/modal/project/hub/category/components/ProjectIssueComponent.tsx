import { type ChangeEvent } from 'react'
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import { FaRegCalendarAlt } from 'react-icons/fa'

import {
  PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN,
  PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO,
  PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN,
  PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO,
} from '@/app/constant/constant'
import {
  type IssueCalendarProps,
  type IssueCalendarWithTimeProps,
  type IssueDescriptionProps,
  type IssueInputProps,
  type IssueProgressProps,
  type IssueSelecProps,
  type IssueTimeProps,
  type ValuePiece,
} from '@/app/types/pageTypes'

export function IssueInput(props: IssueInputProps) {
  return (
    <div className="flex flex-row items-center p-2">
      <div className="w-1/6">
        <span className="text-sm md:text-base">{props.title}</span>
      </div>
      <input
        placeholder={props.placeholder}
        className="ml-4 w-full xl:w-3/5 rounded rounded mt-2 bg-gray-80 border text-gray-900 block text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export function IssueProgress(props: IssueProgressProps) {
  const divClassName = (selectStatus: string, hoverColor: string, color: string) => {
    if (props.progress === selectStatus) {
      return `cursor-pointer text-white ${color} transition ease-in-out duration-300 w-1/5 p-2 rounded-full text-center`
    } else
      return `cursor-pointer bg-gray-200 dark:bg-gray-400 hover:text-white ${hoverColor} transition ease-in-out duration-300 w-1/5 p-2 rounded-full text-center`
  }

  return (
    <div className="flex flex-row items-center p-2">
      <div className="w-1/6">
        <span className="text-sm md:text-base">진행상태</span>
      </div>
      <div className="flex flex-row justify-around w-full">
        {props.progressStatusList.map((data) => (
          <div
            key={data.title}
            className={divClassName(data.value, data.hoverColor, data.color)}
            onClick={() => {
              props.handleProgress(data.value)
            }}
          >
            <span className="text-sm md:text-base">{data.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function IssueSelect(props: IssueSelecProps) {
  return (
    <div className="flex flex-row items-center p-2">
      <div className="w-1/6">
        <span className="text-sm md:text-base">{props.title}</span>
      </div>
      <select className="border-2 border-gray-300 p-2 rounded-lg text-sm bg-transparent">
        {props.selectList.map((data) => (
          <option key={data}>{data}</option>
        ))}
      </select>
    </div>
  )
}

export function IssueCalendar(props: IssueCalendarProps) {
  return (
    <>
      <div className="flex flex-row items-center p-2" key={props.title}>
        <div className="w-1/6">
          <span className="text-sm md:text-base">{props.title}</span>
        </div>
        <div className="flex flex-row items-center rounded rounded mt-2 bg-gray-50 border text-gray-900 w-7/12 lg:w-5/12 sm:w-8/12 text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white">
          <FaRegCalendarAlt onClick={props.openModal} />
          <span className="ml-2 lg:text-base text-xs">
            {moment(props.dateValue as ValuePiece).format('YYYY-MM-DD')}
          </span>
        </div>
      </div>
      <div className="ml-2">
        {props.state ? <Calendar value={props.dateValue} onChange={props.onDateChange} /> : <></>}
      </div>
    </>
  )
}

export function IssueCalendarWithTime(props: IssueCalendarWithTimeProps) {
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
  return (
    <>
      <div className="flex flex-row items-center p-2" key={props.scheduleData.title}>
        <div className="w-1/6">
          <span className="text-sm md:text-base">{props.scheduleData.title}</span>
        </div>
        <div className="ml-4 flex flex-col lg:flex-row items-center items-center rounded rounded mt-2 bg-gray-50 border text-gray-900 w-6/2 text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white truncate">
          <FaRegCalendarAlt onClick={props.scheduleData.openCalendar} className="mb-2 lg:mb-0" />
          <span className="ml-2 lg:text-base text-xs">
            {moment(props.scheduleData.calendarDateValue as ValuePiece).format('YYYY/MM/DD')}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center">
          {issueTimeList.map((data) => (
            <IssueTime
              key={data.unit}
              viewCheckAllDay={data.viewCheckAllDate}
              timeState={data.timeState}
              hoursList={data.hoursList}
              unit={data.unit}
              onChange={data.onChange}
              isCheckAllday={data.isCheckAllday}
            />
          ))}
        </div>
        {props.scheduleData.viewCheckAllDay ? (
          <div className="mt-2 mr-2 ml-2 p-2 w-1/6 flex flex-row items-center justify-around">
            <input type="checkbox" onClick={props.scheduleData.handleAllday} />
            <span className="text-sm">하루종일</span>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="ml-2">
        {props.scheduleData.isCalendarOpen ? (
          <Calendar
            value={props.scheduleData.calendarDateValue}
            onChange={props.scheduleData.onDateChange}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export function IssueTime(props: IssueTimeProps) {
  const setDefaultValue = () => {
    if (props.isCheckAllday) {
      switch (props.unit) {
        case '시':
          return props.timeState.hour
        case '분':
          return props.timeState.minute
        default:
          return ''
      }
    }
  }

  const selectClassName = () => {
    if (props.isCheckAllday) {
      return 'border-2 border-gray-300 p-2 rounded-lg text-sm bg-gray-300'
    }
    return 'border-2 border-gray-300 p-2 rounded-lg text-sm bg-transparent'
  }

  return (
    <div className="mt-2 mr-2 ml-2 w-full flex flex-row items-center justify-between">
      <select
        className={selectClassName()}
        onChange={props.onChange}
        disabled={props.isCheckAllday}
      >
        {props.hoursList.map((data) => (
          <option key={data} value={data}>
            {props.isCheckAllday ? setDefaultValue() : data}
          </option>
        ))}
      </select>
      <span className="sm:ml-2 text-gray-400 text-sm">{props.unit}</span>
    </div>
  )
}

export function IssueFile() {
  return (
    <div className="flex flex-row items-center p-2">
      <div className="w-1/6">
        <span className="text-sm md:text-base">파일첨부</span>
      </div>
      <label htmlFor="selectFile">
        <div className="cursor-pointer p-2 bg-gray-200 dark:bg-gray-400 rounded-lg">파일선택</div>
        <input type="file" id="selectFile" className="hidden" />
      </label>
    </div>
  )
}

export function IssueDescription(props: IssueDescriptionProps) {
  return (
    <div className="border-b-2 border-t-2 border-gray-200 w-full p-2 mt-2">
      <input
        placeholder="내용을 입력해주세요"
        className="w-full p-5 text-sm focus:outline-none text-sm bg-transparent"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}
