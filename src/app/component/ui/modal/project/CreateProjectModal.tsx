import { FaCheck } from 'react-icons/fa'

import Input from '../../input/Input'

import {
  type CreateProjectModalColorSelectProps,
  type CreateProjectModalProps,
} from '@/app/types/ui/modal'

export default function CreateProjectModal(props: CreateProjectModalProps) {
  return (
    <div className="p-5">
      <span className="font-bold">새 프로젝트 만들기</span>
      <div className="mt-2 mb-2">
        <span className="text-sm">프로젝트명</span>
        <Input
          isLabel={false}
          type="text"
          value={props.projectName.value}
          onChange={props.projectName.onChange}
          placeholder="프로젝트명을 입력해주세요."
          className="rounded rounded mt-2 bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
        />
      </div>
      <CreateProjectModalColorSelect
        colorList={props.colorList}
        handleSelectColor={props.handleSelectColor}
        selectColor={props.selectColor}
      />
    </div>
  )
}

export function CreateProjectModalColorSelect(props: CreateProjectModalColorSelectProps) {
  const { colorList, handleSelectColor, selectColor } = props
  const divClassName = (name: string, value: string) => {
    if (props.selectColor === name) {
      return `${value} lg:w-20 md:w-12 w-8 h-8 rounded-lg mt-2 transition ease-in-out duration-600 scale-110 flex items-center justify-center`
    } else {
      return `${value} lg:w-20 md:w-12 w-8 h-8 rounded-lg mt-2 transition ease-in-out duration-500 hover:scale-110 flex items-center justify-center`
    }
  }
  return (
    <div className="mb-2">
      <span className="text-sm">프로젝트 색상</span>
      <div className="flex flex-row items-center justify-around w-full">
        {colorList.map((data) => (
          <div
            className={divClassName(data.name, data.value)}
            key={data.name}
            onClick={() => {
              handleSelectColor(data.name)
            }}
          >
            {selectColor === data.name ? <FaCheck className="text-white" /> : <></>}
          </div>
        ))}
      </div>
    </div>
  )
}
