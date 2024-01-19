import { FaCheck } from 'react-icons/fa'

import {
  type CreateProjectModalColorSelectProps,
  type CreateProjectModalInputProps,
} from '@/app/types/ui/modalTypes'

export function CreateProjectModalInput(props: CreateProjectModalInputProps) {
  return (
    <div className="mt-2 mb-2">
      <span className="text-sm">프로젝트명</span>
      <input
        type="text"
        value={props.projectName.value}
        onChange={props.projectName.onChange}
        placeholder="프로젝트명을 입력해주세요."
        className="rounded rounded mt-2 bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
      />
    </div>
  )
}

export function CreateProjectModalColorSelect(props: CreateProjectModalColorSelectProps) {
  return (
    <div className="mb-2">
      <span className="text-sm">프로젝트 색상</span>
      <div className="flex flex-row items-center justify-around w-full">
        {props.colorList.map((data) => (
          <div
            className={`${data.value} lg:w-20 md:w-12 w-8 h-8 rounded-lg mt-2 transition ease-in-out duration-500 hover:scale-110 flex items-center justify-center`}
            key={data.name}
            onClick={() => {
              props.handleSelectColor(data.name)
            }}
          >
            {props.selectColor === data.name ? <FaCheck className="text-white" /> : <></>}
          </div>
        ))}
      </div>
    </div>
  )
}
