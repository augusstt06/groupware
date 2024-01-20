import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import { FaRegCalendarAlt } from 'react-icons/fa'

import {
  type IssueCalendarProps,
  type IssueCalendarWithTimeProps,
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
            className={divClassName(data.title, data.hoverColor, data.color)}
            onClick={() => {
              props.handleProgress(data.title)
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
  return (
    <>
      <div className="flex flex-row items-center p-2" key={props.title}>
        <div className="w-1/6">
          <span className="text-sm md:text-base">{props.title}</span>
        </div>
        <div className="ml-4 flex flex-col lg:flex-row items-center items-center rounded rounded mt-2 bg-gray-50 border text-gray-900 w-3/5 text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white truncate">
          <FaRegCalendarAlt onClick={props.openModal} className="mb-2 lg:mb-0" />
          <span className="ml-2 lg:text-base text-xs">
            {moment(props.dateValue as ValuePiece).format('YYYY/MM/DD')}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center">
          <IssueTime hours={props.hours} unit="시" onChange={props.handleSelectHour} />
          <IssueTime hours={props.hours} unit="분" onChange={props.handleSelectMinute} />
        </div>
      </div>

      <div className="ml-2">
        {props.state ? <Calendar value={props.dateValue} onChange={props.onDateChange} /> : <></>}
      </div>
    </>
  )
}

export function IssueTime(props: IssueTimeProps) {
  return (
    <div className="mt-2 mr-2 ml-2 w-full flex flex-row items-center justify-between">
      <select
        className="border-2 border-gray-300 p-2 rounded-lg text-sm bg-transparent"
        onChange={props.onChange}
      >
        {props.hours.map((data) => (
          <option key={data}>{data}</option>
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

export function IssueComment() {
  return (
    <div className="border-b-2 border-t-2 border-gray-200 w-full p-2 mt-2">
      <textarea
        placeholder="내용을 입력해주세요"
        className="w-full resize-none focus:outline-none text-sm bg-transparent"
      />
    </div>
  )
}
