import { IoClose } from 'react-icons/io5'

import { type WriteModalBtnGroupProps } from '@/app/types/ui/btnTypes'

export default function WriteModalBtnGroup(props: WriteModalBtnGroupProps) {
  return (
    <div className="flex flex-row justify-between items-center border-b rounded-t dark:border-gray-600 w-full p-3">
      <div className="w-1/6 text-center">
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="static-modal"
          onClick={props.handleClickClose}
        >
          <IoClose className="w-4 h-4" />
        </button>
      </div>
      <div className="w-2/3 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">게시글 설정</h3>
      </div>
      <div className="w-2/5 flex flex-row items-center justify-around">
        <button
          className="mt-3 mb-3 w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75"
          onClick={props.handleClickPostPending}
        >
          <span>임시저장 | </span>
          <span className="text-center items-center">{props.saveList.length}</span>
        </button>
        <button
          className="mt-3 mb-3 w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75"
          onClick={props.handleClickPosting}
        >
          등록
        </button>
      </div>
    </div>
  )
}
