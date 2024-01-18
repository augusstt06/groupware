import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css'
import { FaRegCalendarAlt } from 'react-icons/fa'

import {
  type TaskCalendarProps,
  type TaskProgressProps,
  type TaskSelectManagerProps,
} from '@/app/types/pageTypes'

export function TaskInput() {
  return (
    <div className="flex flex-row items-center p-2">
      <div className="w-1/6">
        <span>제목</span>
      </div>
      <input
        placeholder="제목을 입력해주세요"
        className="rounded rounded mt-2 bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
      />
    </div>
  )
}

export function TaskProgress(props: TaskProgressProps) {
  return (
    <div className="flex flex-row items-center p-2">
      <div className="w-1/6">
        <span>진행상태</span>
      </div>
      <div className="flex flex-row justify-around w-full">
        {props.progressStatusList.map((data) => (
          <div
            key={data.title}
            className={`cursor-pointer bg-gray-200 dark:bg-gray-400 hover:text-white ${data.color} transition ease-in-out duration-300 w-1/5 p-2 rounded-full text-center`}
          >
            {data.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export function TaskSelectManager(props: TaskSelectManagerProps) {
  return (
    <div className="flex flex-row items-center p-2">
      <div className="w-1/6">
        <span>담당자</span>
      </div>
      <select className="border-2 border-gray-300 p-2 rounded-lg text-sm bg-transparent">
        {props.managerList.map((data) => (
          <option key={data}>{data}</option>
        ))}
      </select>
    </div>
  )
}

export function TaskCalendar(props: TaskCalendarProps) {
  return (
    <div className="flex flex-row items-center p-2" key={props.title}>
      <div className="w-1/6">
        <span>{props.title}</span>
      </div>
      <div className="rounded rounded mt-2 bg-gray-50 border text-gray-900 w-1/3 text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white">
        <FaRegCalendarAlt onClick={props.onClick} />
      </div>
      <div className="ml-2">{props.state ? <Calendar /> : <></>}</div>
    </div>
  )
}

export function TaskFile() {
  return (
    <div className="flex flex-row items-center p-2">
      <div className="w-1/6">
        <span>파일첨부</span>
      </div>
      <label htmlFor="selectFile">
        <div className="cursor-pointer p-2 bg-gray-200 dark:bg-gray-400 rounded-lg">파일선택</div>
        <input type="file" id="selectFile" className="hidden" />
      </label>
    </div>
  )
}

export function TaskComment() {
  return (
    <div className="border-b-2 border-t-2 border-gray-200 w-full p-2 mt-2">
      <textarea
        placeholder="내용을 입력해주세요"
        className="w-full resize-none focus:outline-none text-sm bg-transparent"
      />
    </div>
  )
}
