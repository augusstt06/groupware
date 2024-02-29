import { type ChangeEvent } from 'react'

import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import { FaRegCalendarAlt } from 'react-icons/fa'

import {
  PROJECT_DATE_FORMAT,
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
} from '@/app/types/pageType'

export function IssueInput(props: IssueInputProps) {
  return (
    <div className="flex flex-row items-center p-2">
      <div className="w-1/6">
        <span className="text-sm md:text-base">{props.title}</span>
      </div>
      <input
        placeholder={props.placeholder}
        className="ml-4 w-full xl:w-3/5 rounded rounded mt-2 border-2 text-gray-900 block text-sm border-indigo-200 dark:border-indigo-300 p-2.5 bg-transparent dark:border-white-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
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
      return `cursor-pointer bg-transparent border-2 border-indigo-200 dark:border-indigo-300 hover:border-transparent hover:text-white ${hoverColor} transition ease-in-out duration-300 w-1/5 p-2 rounded-full text-center`
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
      <select className="border-2 border-indigo-200 dark:border-indigo-300 p-2 rounded-lg text-sm bg-transparent">
        {props.selectList.map((data) => (
          <option key={data}>{data}</option>
        ))}
      </select>
    </div>
  )
}

export function IssueCalendar(props: IssueCalendarProps) {
  const renderTitlte = () => {
    if (props.title === '') {
      return <></>
    }
    return (
      <div className="w-1/6">
        <span className="text-sm md:text-base">{props.title}</span>
      </div>
    )
  }
  return (
    <>
      <div className="flex flex-row items-center p-2" key={props.title}>
        {renderTitlte()}
        <div className="flex flex-row items-center rounded rounded mt-2 bg-transparent border-2 text-gray-900 w-40 text-sm border-indigo-200 dark:border-indigo-300 p-2.5 dark:placeholder-gray-400 dark:text-white">
          <FaRegCalendarAlt onClick={props.openModal} />
          <span className="ml-2 lg:text-base text-xs">
            {moment(props.dateValue as ValuePiece).format(PROJECT_DATE_FORMAT)}
          </span>
        </div>
      </div>
    </>
  )
}

export function IssueCalendarWithTime(props: IssueCalendarWithTimeProps) {
  const issueTimeList = [
    {
      timeCategory: props.scheduleData.timeCategory,
      viewCheckAllDate: props.scheduleData.viewCheckAllDay,
      defaultStartTime: props.scheduleData.defaultStartTime,
      defaultEndTime: props.scheduleData.defaultEndTime,
      timeState: props.scheduleData.timeState,
      hoursList: props.scheduleData.hoursList,
      minutesList: props.scheduleData.minutesList,
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
      timeCategory: props.scheduleData.timeCategory,
      viewCheckAllDate: props.scheduleData.viewCheckAllDay,
      defaultStartTime: props.scheduleData.defaultStartTime,
      defaultEndTime: props.scheduleData.defaultEndTime,
      timeState: props.scheduleData.timeState,
      hoursList: props.scheduleData.hoursList,
      minutesList: props.scheduleData.minutesList,
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
      <div className="min-w-40 block col-span-1">
        <span className="text-sm md:text-base">{props.scheduleData.title}</span>
      </div>
    )
  }
  return (
    <>
      <div className="items-center p-2 grid grid-cols-6 gap-2 ">
        {renderTitle()}
        <div className="col-span-5 grid grid-cols-6 gap-2">
          <div className="col-span-3 lg:ml-0 ml-4 flex flex-col lg:flex-row items-center items-center rounded mt-2 bg-transparent border-2 text-gray-900 border-indigo-200 dark:border-indigo-300 w-26 text-sm  p-2 dark:placeholder-gray-400 dark:text-white truncate">
            <FaRegCalendarAlt onClick={props.scheduleData.openCalendar} className="mb-2 lg:mb-0" />
            <span className="ml-2 lg:text-base text-xs">
              {moment(props.scheduleData.calendarDateValue as ValuePiece).format('YYYY/MM/DD')}
            </span>
          </div>
          <div className="col-span-2 grid lg:grid-cols-2 grid-row-2 gap-2">
            {issueTimeList.map((data) => (
              <IssueTime
                key={data.unit}
                timeCategory={props.scheduleData.timeCategory}
                defaultStartTime={props.scheduleData.defaultStartTime}
                defaultEndTime={props.scheduleData.defaultEndTime}
                viewCheckAllDay={data.viewCheckAllDate}
                timeState={data.timeState}
                hoursList={data.hoursList}
                minutesList={data.minutesList}
                unit={data.unit}
                onChange={data.onChange}
                isCheckAllday={data.isCheckAllday}
              />
            ))}
          </div>
          {props.scheduleData.viewCheckAllDay ? (
            <div className="col-span-1 grid sm:grid-cols-3 grid-row-3 items-center">
              <input
                type="checkbox"
                onClick={props.scheduleData.handleAllday}
                className="w-4 h-4 col-span-1 text-purple-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="col-span-2 xl:inline hidden">
                <span className="text-xs">All</span>
              </div>
              <div className="col-span-2 grid grid-row-2 inline xl:hidden ">
                <span className="text-sm">All</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export function IssueTime(props: IssueTimeProps) {
  const getDefaultValue = () => {
    switch (props.timeCategory) {
      case 'start':
        if (props.unit === PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO) {
          return props.defaultStartTime.hour
        }
        return props.defaultStartTime.minute
      case 'end':
        if (props.unit === PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO) {
          return props.defaultEndTime.hour
        }
        return props.defaultEndTime.minute
    }
  }

  const hourOption = () => {
    return (
      <>
        {props.hoursList.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </>
    )
  }
  const minuteOption = () => {
    return (
      <>
        {props.minutesList.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </>
    )
  }
  const renderSelectOption = () => {
    switch (props.timeCategory) {
      case 'start':
        if (props.isCheckAllday) {
          switch (props.unit) {
            case PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO:
              return <option value={props.timeState.hour}>{props.timeState.hour}</option>
            case PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO:
              return <option value={props.timeState.minute}>{props.timeState.minute}</option>
          }
        }
        if (props.unit === PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO) {
          return hourOption()
        }
        return minuteOption()

      case 'end':
        if (props.isCheckAllday) {
          switch (props.unit) {
            case PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO:
              return <option value={props.timeState.hour}>{props.timeState.hour}</option>
            case PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO:
              return <option value={props.timeState.minute}>{props.timeState.minute}</option>
          }
        }
        if (props.unit === PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO) {
          return hourOption()
        }
        return minuteOption()
    }
  }
  const selectClassName = () => {
    if (props.isCheckAllday) {
      return 'border-2 border-indigo-200 dark:border-indigo-300 p-1 rounded-lg text-sm bg-gray-300'
    }
    return 'border-2 border-indigo-200 dark:border-indigo-300 p-1 rounded-lg text-sm bg-transparent'
  }

  return (
    <div className="mt-2  w-full flex flex-row items-center justify-around lg:justify-between">
      <select
        className={selectClassName()}
        onChange={props.onChange}
        disabled={props.isCheckAllday}
        defaultValue={getDefaultValue()}
      >
        {renderSelectOption()}
      </select>
      <span className="hidden sm:inline ml-1 text-gray-400 text-sm">{props.unit}</span>
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
        <div className="cursor-pointer p-2 bg-transparent rounded-lg border-2 border-indigo-200 dark:border-indigo-300">
          파일선택
        </div>
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
