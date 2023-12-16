import { IoMdCloseCircle } from 'react-icons/io'
import { IoSearchSharp } from 'react-icons/io5'

import { InputIconlabel } from '../../label/InputIconlabel'
import BoardWriteModal from '../../modal/BoardWriteModal'

import { type BoardHubInputProps } from '@/app/types/ui/inputTypes'

export default function BoardHubInput(props: BoardHubInputProps) {
  const handleClickWrite = () => {
    props.setIsWrite(!props.isWrite)
  }
  return (
    <div className="flex flex-row justify-around">
      {props.isWrite ? <BoardWriteModal onClick={handleClickWrite} /> : <></>}
      <div className="flex mt-3 mb-3 mr-2 w-4/6">
        <InputIconlabel icon={<IoSearchSharp className="w-4 h-4" />} />
        <input
          type="text"
          value={props.searchInput.value}
          onChange={props.searchInput.onChange}
          className="rounded-none bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="제목, 내용, 작성자 입력"
        />
        <span className="inline-flex items-center md:px-3 px-1 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <IoMdCloseCircle />
        </span>
      </div>
      <div className="flex flex-row justify-around w-2/6">
        <button className="mr-2 mt-3 mb-3 w-1/2 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
          검색
        </button>
        <button
          className="mt-3 mb-3 w-1/2 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75"
          onClick={handleClickWrite}
        >
          글쓰기
        </button>
      </div>
    </div>
  )
}
