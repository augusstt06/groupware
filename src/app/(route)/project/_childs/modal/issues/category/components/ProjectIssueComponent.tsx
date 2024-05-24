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
} from '@/_constant/constant'
import {
  type IssueCalendarProps,
  type IssueCalendarWithTimeProps,
  type IssueDescriptionProps,
  type IssueInputProps,
  type IssueProgressProps,
  type IssueSelecProps,
  type IssueTimeProps,
  type ValuePiece,
} from '@/_types/pageType'

export function IssueInput(props: IssueInputProps) {
  const { title, placeholder, value, onChange } = props
  return (
    <div className="p-2 sort-row-flex">
      <div className="w-1/6">
        <span className="text-sm md:text-base">{title}</span>
      </div>
      <input
        placeholder={placeholder}
        className="w-full xl:w-3/5 rounded-lg mt-2 border-2 text-gray-900 block text-sm border-indigo-200 dark:border-indigo-300 p-2.5 bg-transparent dark:border-white-600 dark:placeholder-gray-400 dark:bg-[#505050] dark:text-white focus:outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export function IssueProgress(props: IssueProgressProps) {
  const { progressStatusList, handleProgress, progress } = props
  const divClassName = (selectStatus: string, hoverColor: string, color: string) => {
    if (progress === selectStatus) {
      return `cursor-pointer text-white ${color} smooth-transition w-1/5 p-2 rounded-full sort-row-flex justify-center`
    } else
      return `cursor-pointer bg-transparent dark:bg-[#505050] border-2 border-indigo-200 dark:border-indigo-300 hover:border-transparent hover:text-white ${hoverColor} smooth-transition w-1/5 p-2 rounded-full text-center`
  }

  return (
    <div className="p-2 sort-row-flex">
      <div className="w-1/6">
        <span className="text-sm md:text-base">진행상태</span>
      </div>
      <div className="flex flex-row justify-around w-full">
        {progressStatusList.map((data) => (
          <div
            key={data.title}
            className={divClassName(data.value, data.hoverColor, data.color)}
            onClick={() => {
              handleProgress(data.value)
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
  const { title, selectList } = props
  return (
    <div className="p-2 sort-row-flex">
      <div className="w-1/6">
        <span className="text-sm md:text-base">{title}</span>
      </div>
      <select className="p-2 text-sm bg-transparent dark:bg-[#505050] border-2 border-indigo-200 rounded-lg dark:border-indigo-300">
        {selectList.map((data) => (
          <option key={data}>{data}</option>
        ))}
      </select>
    </div>
  )
}

export function IssueCalendar(props: IssueCalendarProps) {
  const { title, openModal, dateValue } = props
  const renderTitlte = () => {
    if (title === '') {
      return <></>
    }
    return (
      <div className="w-1/6">
        <span className="text-sm md:text-base">{title}</span>
      </div>
    )
  }
  return (
    <>
      <div className="p-2 sort-row-flex" key={title}>
        {renderTitlte()}
        <div className="sort-row-flex rounded-lg mt-2 bg-transparent dark:bg-[#505050] border-2 text-gray-900 w-40 text-sm border-indigo-200 dark:border-indigo-300 p-2.5 dark:placeholder-gray-400 dark:text-white">
          <FaRegCalendarAlt onClick={openModal} />
          <span className="ml-2 text-xs lg:text-base">
            {moment(dateValue as ValuePiece).format(PROJECT_DATE_FORMAT)}
          </span>
        </div>
      </div>
    </>
  )
}

export function IssueCalendarWithTime(props: IssueCalendarWithTimeProps) {
  const { scheduleData } = props
  const issueTimeList = [
    {
      timeCategory: scheduleData.timeCategory,
      viewCheckAllDate: scheduleData.viewCheckAllDay,
      defaultStartTime: scheduleData.defaultStartTime,
      defaultEndTime: scheduleData.defaultEndTime,
      timeState: scheduleData.timeState,
      hoursList: scheduleData.hoursList,
      minutesList: scheduleData.minutesList,
      unit: PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO,
      isCheckAllday: scheduleData.isCheckAllday,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => {
        scheduleData.handleSelectTime(
          scheduleData.timeCategory,
          PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_EN,
          e.target.value,
        )
      },
    },
    {
      timeCategory: scheduleData.timeCategory,
      viewCheckAllDate: scheduleData.viewCheckAllDay,
      defaultStartTime: scheduleData.defaultStartTime,
      defaultEndTime: scheduleData.defaultEndTime,
      timeState: scheduleData.timeState,
      hoursList: scheduleData.hoursList,
      minutesList: scheduleData.minutesList,
      unit: PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO,
      isCheckAllday: scheduleData.isCheckAllday,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => {
        scheduleData.handleSelectTime(
          scheduleData.timeCategory,
          PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_EN,
          e.target.value,
        )
      },
    },
  ]

  const renderTitle = () => {
    if (scheduleData.title === '') {
      return <></>
    }
    return (
      <div className="block col-span-1 min-w-40">
        <span className="text-sm md:text-base">{scheduleData.title}</span>
      </div>
    )
  }
  return (
    <>
      <div className="items-center p-2 grid grid-cols-6 gap-2">
        {renderTitle()}
        <div className="grid grid-cols-6 col-span-5 gap-2">
          <div className="sort-vertical-flex p-2 mt-2 ml-4 text-sm text-gray-900 truncate bg-transparent dark:bg-[#505050] border-2 border-indigo-200 rounded col-span-3 lg:ml-0 lg:flex-row dark:border-indigo-300 w-26 dark:placeholder-gray-400 dark:text-white">
            <FaRegCalendarAlt onClick={scheduleData.openCalendar} className="mb-2 lg:mb-0" />
            <span className="ml-2 text-xs lg:text-base">
              {moment(scheduleData.calendarDateValue as ValuePiece).format('YYYY/MM/DD')}
            </span>
          </div>
          <div className="grid col-span-2 gap-2 lg:grid-cols-2 grid-row-2">
            {issueTimeList.map((data) => (
              <IssueTime
                key={data.unit}
                timeCategory={scheduleData.timeCategory}
                defaultStartTime={scheduleData.defaultStartTime}
                defaultEndTime={scheduleData.defaultEndTime}
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
          {scheduleData.viewCheckAllDay === true ? (
            <div className="items-center grid col-span-1 sm:grid-cols-3 grid-row-3">
              <input
                type="checkbox"
                onClick={scheduleData.handleAllday}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded col-span-1 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="hidden col-span-2 xl:inline">
                <span className="text-xs">All</span>
              </div>
              <div className="grid col-span-2 grid-row-2 xl:hidden ">
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
  const {
    timeCategory,
    defaultStartTime,
    defaultEndTime,
    isCheckAllday,
    hoursList,
    minutesList,
    timeState,
    unit,
    onChange,
  } = props
  const getDefaultValue = () => {
    switch (timeCategory) {
      case 'start':
        if (unit === PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO) {
          return defaultStartTime.hour
        }
        return defaultStartTime.minute
      case 'end':
        if (unit === PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO) {
          return defaultEndTime.hour
        }
        return defaultEndTime.minute
    }
  }

  const hourOption = () => {
    return (
      <>
        {hoursList.map((data) => (
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
        {minutesList.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </>
    )
  }
  const renderSelectOption = () => {
    switch (timeCategory) {
      case 'start':
        if (isCheckAllday === true) {
          switch (unit) {
            case PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO:
              return <option value={timeState.hour}>{timeState.hour}</option>
            case PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO:
              return <option value={timeState.minute}>{timeState.minute}</option>
          }
        }
        if (unit === PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO) {
          return hourOption()
        }
        return minuteOption()

      case 'end':
        if (isCheckAllday === true) {
          switch (unit) {
            case PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO:
              return <option value={timeState.hour}>{timeState.hour}</option>
            case PROJECT_ISSUE_SCHEDULE_UNIT_MINUTE_KO:
              return <option value={timeState.minute}>{timeState.minute}</option>
          }
        }
        if (unit === PROJECT_ISSUE_SCHEDULE_UNIT_HOUR_KO) {
          return hourOption()
        }
        return minuteOption()
    }
  }
  const selectClassName = () => {
    if (isCheckAllday === true) {
      return 'border-2 border-indigo-200 dark:border-indigo-300 p-1 rounded-lg text-sm bg-gray-300'
    }
    return 'border-2 border-indigo-200 dark:border-indigo-300 p-1 rounded-lg text-sm bg-transparent'
  }

  return (
    <div className="justify-around w-full mt-2 sort-row-flex lg:justify-between">
      <select
        className={selectClassName()}
        onChange={onChange}
        disabled={isCheckAllday}
        defaultValue={getDefaultValue()}
      >
        {renderSelectOption()}
      </select>
      <span className="hidden ml-1 text-sm text-gray-400 sm:inline">{unit}</span>
    </div>
  )
}

export function IssueFile() {
  return (
    <div className="p-2 sort-row-flex">
      <div className="w-1/6">
        <span className="text-sm md:text-base">파일첨부</span>
      </div>
      <label htmlFor="selectFile">
        <div className="p-2 bg-transparent dark:bg-[#505050] border-2 border-indigo-200 rounded-lg cursor-pointer dark:border-indigo-300">
          파일선택
        </div>
        <input type="file" id="selectFile" className="hidden" />
      </label>
    </div>
  )
}

export function IssueDescription(props: IssueDescriptionProps) {
  const { value, onChange } = props
  return (
    <div className="w-full p-2 mt-2">
      <input
        placeholder="내용을 입력해주세요"
        className="w-full p-5 text-sm bg-transparent dark:bg-[#505050] rounded-lg focus:outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
