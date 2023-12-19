'use client'

import { IoClose } from 'react-icons/io5'

import BoardModalInputGroup from '../input/board/BoardModalInputGroup'
import TextEditor from '../textEditor/TextEditor'

import useInput from '@/app/module/hooks/reactHooks/useInput'
import { type BoardWriteModalprops } from '@/app/types/ui/modalTypes'
// const Editor = dynamic(async () => import('../textEditor/TextEditor'), {
//   ssr: false,
// })

export default function BoardWriteModal(props: BoardWriteModalprops) {
  const titleInput = useInput('')
  return (
    <>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="absolute top-20 left-20 right-20 p-4 w-5/6">
          <div className="relative rounded-lg shadow dark:bg-gray-700">
            <div className="flex flex-row justify-between items-center border-b rounded-t dark:border-gray-600 w-full p-3">
              <div className="w-1/6 text-center">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="static-modal"
                  onClick={props.onClick}
                >
                  <IoClose className="w-4 h-4" />
                </button>
              </div>
              <div className="w-2/3 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">게시글 설정</h3>
              </div>
              <div className="w-2/5 flex flex-row items-center justify-around">
                <button className="mt-3 mb-3 w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
                  임시저장
                </button>
                <button className="mt-3 mb-3 w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
                  등록
                </button>
              </div>
            </div>

            <div className="p-2 space-y-4 flex flex-row w-full">
              <BoardModalInputGroup titleInput={titleInput} />
              {/*  */}
              <div className="w-2/3 bg-gray-300">
                <TextEditor />
                {/* <Editor /> */}
              </div>
            </div>

            <div className="flex items-center border-t border-gray-200 rounded-b dark:border-gray-600">
              <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  className="w-4 h-4 p-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-checkbox-1"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  공지글로 지정
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
