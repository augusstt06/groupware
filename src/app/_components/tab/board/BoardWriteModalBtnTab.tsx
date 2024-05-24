import { IoClose } from 'react-icons/io5'

import Button from '../../button/Button'

import { type BoardWriteModalBtnTabProps } from '@/_types/ui/modal'

export default function BoardWriteModalBtnTab(props: BoardWriteModalBtnTabProps) {
  const closeBtnContent = <IoClose className="w-4 h-4" />
  const saveBtnContent = (
    <>
      <span onClick={props.handleClickPostPending}>임시저장 | </span>
      <span className="items-center text-center" onClick={props.handleClickOpenSaveList}>
        {props.saveList.length}
      </span>
    </>
  )
  return (
    <div className="flex flex-row items-center justify-between w-full p-6 border-b rounded-t dark:border-gray-600">
      <div className="w-1/6 text-center">
        <Button
          buttonContent={closeBtnContent}
          className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={props.handleClickClose}
        />
      </div>
      <div className="w-2/3 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">게시글 설정</h3>
      </div>
      <div className="flex flex-row items-center justify-around w-3/5">
        <Button
          buttonContent={saveBtnContent}
          className="items-center w-2/5 mt-3 mb-3 text-xs text-center text-indigo-500 border-2 border-indigo-500 rounded-lg transition ease-in-out duration-500 md:text-sm hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white hover:bg-indigo-500 dark:hover:bg-white dark:hover:text-indigo-500 dark:hover:border-indigo-500/75"
        />
        <Button
          buttonContent="등록"
          className="items-center w-2/5 mt-3 mb-3 text-xs text-center text-indigo-500 border-2 border-indigo-500 rounded-lg transition ease-in-out duration-500 md:text-sm hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white hover:bg-indigo-500 dark:hover:bg-white dark:hover:text-indigo-500 dark:hover:border-indigo-500/75"
          onClick={props.handleClickPosting}
        />
      </div>
    </div>
  )
}
